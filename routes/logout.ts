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
    const acessToken = getCookies(req.headers)['cardflipper_access_token']

    if (refreshToken) {
      await googleApi.revokeAccessToken(refreshToken)
      deleteCookie(response.headers, 'cardflipper_refresh_token')
    }

    if (acessToken) {
      await googleApi.revokeAccessToken(acessToken)
      deleteCookie(response.headers, 'cardflipper_access_token')
    }

    deleteCookie(response.headers, 'cardflipper_user_info_avatarUrl')
    deleteCookie(response.headers, 'cardflipper_user_info_email')
    deleteCookie(response.headers, 'cardflipper_user_info_name')

    return response
  },
}
