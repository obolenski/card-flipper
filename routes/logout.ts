import { Handlers } from '$fresh/server.ts'
import { deleteCookie, getCookies } from '$std/http/cookie.ts'
import * as googleApi from '../services/googleApi.ts'

export const handler: Handlers = {
  async GET(req, ctx) {
    const response = new Response('', {
      status: 307,
      headers: { Location: '/' },
    })

    const refreshToken = getCookies(req.headers)['cardflipper_refresh_token']

    await googleApi.revokeAccessToken(refreshToken)

    deleteCookie(response.headers, 'cardflipper_refresh_token')

    return response
  },
}
