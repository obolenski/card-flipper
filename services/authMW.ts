import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { deleteCookie, getCookies, setCookie } from '$std/http/cookie.ts'
import { create, decode } from 'https://deno.land/x/djwt@v2.7/mod.ts'
import { AppUser, MWState } from '../utils/types.ts'
import * as googleApi from '../services/googleApi.ts'
import { COOKIES } from '../utils/cookies.ts'

export default async function authMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext<MWState>
): Promise<Response> {
  const { url, headers } = req

  if (url.includes('_frsh')) {
    return await ctx.next()
  }

  const redirectUrl = url.split('?')[0]
  const cookies = getCookies(headers)
  const jwt = cookies[COOKIES.USER_TOKEN]
  const existingRefreshToken = cookies[COOKIES.REFRESH_TOKEN]
  const existingAccessToken = cookies[COOKIES.ACCESS_TOKEN]

  ctx.state.googleLoginUrl = googleApi.getGoogleUrl(redirectUrl)

  let refreshedAccessToken

  jwt && (ctx.state.user = buildUserFromCookie(jwt))

  if (existingAccessToken && !ctx.state.user) {
    ctx.state.user = await googleApi.getUserData(existingAccessToken)
  }

  if (existingRefreshToken && !ctx.state.user) {
    refreshedAccessToken = await googleApi.getAccessTokenFromRefreshToken(
      existingRefreshToken,
      redirectUrl
    )
    ctx.state.user = await googleApi.getUserData(refreshedAccessToken)
  }

  if (ctx.state.user) {
    const response = await ctx.next()
    !jwt && (await setJWTCookie(response, ctx.state.user))
    refreshedAccessToken && setAccessTokenCookie(response, refreshedAccessToken)
    return response
  }

  const code = new URL(url).searchParams.get('code')

  if (code) {
    const tokens = await googleApi.getTokensFromCode(code, redirectUrl)
    const refreshToken = tokens?.refresh_token
    const accessToken = tokens?.access_token

    ctx.state.user = await googleApi.getUserData(accessToken)

    if (ctx.state.user) {
      const response = new Response('', {
        status: 307,
        headers: { Location: '/' },
      })
      if (refreshToken) setRefreshTokenCookie(response, refreshToken)
      setAccessTokenCookie(response, accessToken)
      await setJWTCookie(response, ctx.state.user)
      return response
    }
  }

  const response = await ctx.next()
  deleteAllCookies(response)
  return response
}

function setAccessTokenCookie(response: Response, accessToken: string) {
  setCookie(response.headers, {
    name: COOKIES.ACCESS_TOKEN,
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    path: '/',
    sameSite: 'None',
    secure: true,
  })
}

function setRefreshTokenCookie(response: Response, refreshToken: string) {
  setCookie(response.headers, {
    name: COOKIES.REFRESH_TOKEN,
    value: refreshToken,
    maxAge: 60 * 60 * 24 * 7 * 365,
    httpOnly: true,
    path: '/',
    sameSite: 'None',
    secure: true,
  })
}

async function setJWTCookie(response: Response, user: AppUser) {
  const key = await crypto.subtle.generateKey(
    { name: 'HMAC', hash: 'SHA-512' },
    true,
    ['sign', 'verify']
  )
  try {
    const jwt = await create({ alg: 'HS512', typ: 'JWT' }, user, key)
    setCookie(response.headers, {
      name: COOKIES.USER_TOKEN,
      value: jwt,
      maxAge: 900,
      httpOnly: true,
      path: '/',
      sameSite: 'Strict',
    })
  } catch (e) {
    console.log(e)
  }
}

function buildUserFromCookie(jwt: string) {
  try {
    const [, payload] = decode(jwt)
    const { avatarUrl, email, name } = payload as AppUser

    if (email) {
      const user: AppUser = {
        name: name.replace('+', ' ') ?? email,
        email: email,
        avatarUrl: avatarUrl ?? '',
      }
      return user
    }
  } catch (e) {
    console.log(e)
  }

  return undefined
}

export function deleteAllCookies(response: Response) {
  deleteCookie(response.headers, COOKIES.USER_TOKEN)
  deleteCookie(response.headers, COOKIES.REFRESH_TOKEN)
  deleteCookie(response.headers, COOKIES.ACCESS_TOKEN)
}
