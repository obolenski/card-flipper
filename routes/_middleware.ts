import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { getCookies, setCookie } from '$std/http/cookie.ts'
import { AppUser } from '../utils/types.ts'
import * as googleApi from '../services/googleApi.ts'

interface State {
  user: AppUser
  googleLoginUrl: string
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const redirectUrl = req.url.split('?')[0]
  ctx.state.googleLoginUrl = googleApi.getGoogleUrl(redirectUrl)

  const storedUserInfo = buildUserFromCookies(req)
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
      setUserDataCookies(response, user)
      return response
    }
  } else if (existingAcessToken) {
    const user = await googleApi.getUserData(existingAcessToken)
    if (user) {
      ctx.state.user = user
      const response = await ctx.next()
      setUserDataCookies(response, user)
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
    setAllCookies(response, refreshToken, accessToken, userData)
    return response
  }

  return await ctx.next()
}

function setAllCookies(
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
  setUserDataCookies(response, userData)
}

function setUserDataCookies(response: Response, userData: AppUser) {
  setCookie(response.headers, {
    name: 'cardflipper_user_info_avatarUrl',
    value: userData.avatarUrl,
    maxAge: 900,
    httpOnly: true,
    path: '/',
    sameSite: 'Strict',
  })
  setCookie(response.headers, {
    name: 'cardflipper_user_info_email',
    value: userData.email,
    maxAge: 900,
    httpOnly: true,
    path: '/',
    sameSite: 'Strict',
  })
  setCookie(response.headers, {
    name: 'cardflipper_user_info_name',
    value: userData.name.replace(' ', '+'),
    httpOnly: true,
    maxAge: 900,
    path: '/',
    sameSite: 'Strict',
  })
}

function buildUserFromCookies(req: Request) {
  const avatarUrl = getCookies(req.headers)['cardflipper_user_info_avatarUrl']
  const email = getCookies(req.headers)['cardflipper_user_info_email']
  const name = getCookies(req.headers)['cardflipper_user_info_name']
  if (avatarUrl && email && name) {
    const user: AppUser = {
      name: name.replace('+', ' '),
      email: email,
      avatarUrl: avatarUrl,
    }
    return user
  }
  return undefined
}
