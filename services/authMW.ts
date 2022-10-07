import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { getCookies, setCookie, deleteCookie } from '$std/http/cookie.ts'
import { create, decode } from 'https://deno.land/x/djwt@v2.7/mod.ts'
import { AppUser } from '../utils/types.ts'
import * as googleApi from '../services/googleApi.ts'

interface State {
  user: AppUser
  googleLoginUrl: string
}
export default async function authMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
): Promise<Response> {
  if (req.url.includes('_frsh')) return await ctx.next()

  const redirectUrl = req.url.split('?')[0]
  ctx.state.googleLoginUrl = googleApi.getGoogleUrl(redirectUrl)

  const storedUserInfo = buildUserFromCookie(req)
  if (storedUserInfo) {
    ctx.state.user = storedUserInfo
    const response = await ctx.next()
    return response
  }

  const existingRefreshToken = getCookies(req.headers)[
    'cardflipper_refresh_token'
  ]
  const existingAcessToken = getCookies(req.headers)['cardflipper_access_token']

  if (existingRefreshToken) {
    const accessToken = await googleApi.getAccessTokenFromRefreshToken(
      existingRefreshToken,
      redirectUrl
    )
    const user = await googleApi.getUserData(accessToken)
    if (user) {
      ctx.state.user = user
      const response = await ctx.next()
      setJWTCookie(response, user)
      return response
    }
  } else if (existingAcessToken) {
    const user = await googleApi.getUserData(existingAcessToken)
    if (user) {
      ctx.state.user = user
      const response = await ctx.next()
      setJWTCookie(response, user)
      return response
    }
  }

  const currentUrl = new URL(req.url)
  const code = currentUrl.searchParams.get('code')

  if (!code) return await ctx.next()

  const tokens = await googleApi.getTokensFromCode(code, redirectUrl)

  const accessToken = tokens.access_token
  const refreshToken = tokens.refresh_token

  const userData = await googleApi.getUserData(accessToken)
  if (userData) {
    ctx.state.user = userData
    const response = await ctx.next()
    await setAllCookies(response, refreshToken, accessToken, userData)
    return response
  }
  return await ctx.next()
}

async function setAllCookies(
  response: Response,
  refreshToken: string,
  accessToken: string,
  userData: AppUser
) {
  if (refreshToken) {
    setCookie(response.headers, {
      name: 'cardflipper_refresh_token',
      value: refreshToken,
      maxAge: 60 * 60 * 24 * 7 * 365,
      httpOnly: true,
      path: '/',
      sameSite: 'None',
      secure: true,
    })
  }
  setCookie(response.headers, {
    name: 'cardflipper_access_token',
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    path: '/',
    sameSite: 'None',
    secure: true,
  })
  await setJWTCookie(response, userData)
}

async function setJWTCookie(response: Response, userData: AppUser) {
  const key = await crypto.subtle.generateKey(
    { name: 'HMAC', hash: 'SHA-512' },
    true,
    ['sign', 'verify']
  )
  try {
    const jwt = await create({ alg: 'HS512', typ: 'JWT' }, userData, key)
    setCookie(response.headers, {
      name: 'cardflipper_user_token',
      value: jwt,
      maxAge: 900,
      httpOnly: true,
      path: '/',
      sameSite: 'Strict',
    })
  } catch (error) {
    console.log(error)
  }
}

function buildUserFromCookie(req: Request) {
  const jwt = getCookies(req.headers)['cardflipper_user_token']
  if (!jwt) return undefined
  try {
    const [_header, payload, _signature] = decode(jwt)
    const usr = payload as AppUser
    const avatarUrl = usr.avatarUrl
    const email = usr.email
    const name = usr.name
    if (avatarUrl && email && name) {
      const user: AppUser = {
        name: name.replace('+', ' '),
        email: email,
        avatarUrl: avatarUrl,
      }
      return user
    }
  } catch (e) {
    console.log(e)
  }

  return undefined
}
