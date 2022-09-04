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

  const existingRefreshToken = getCookies(req.headers)[
    'cardflipper_refresh_token'
  ]
  if (existingRefreshToken) {
    const accessToken = await googleApi.getAccessTokenFromRefreshToken(
      existingRefreshToken,
      redirectUrl
    )
    const user = await googleApi.getUserData(accessToken)
    if (user) {
      ctx.state.user = user
      const response = await ctx.next()
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

    setCookie(response.headers, {
      name: 'cardflipper_refresh_token',
      value: refreshToken,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      path: '/',
    })
    return response
  }

  return await ctx.next()
}
