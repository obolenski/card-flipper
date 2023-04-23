import { Handlers } from '$fresh/server.ts'
import { getCookies } from '$std/http/cookie.ts'
import * as googleApi from '../services/googleApi.ts'
import { COOKIES } from '../utils/cookies.ts'
import { deleteAllCookies } from '../services/authMW.ts'

export const handler: Handlers = {
  async GET(req, _ctx) {
    const response = new Response('', {
      status: 307,
      headers: { Location: '/' },
    })

    const cookies = getCookies(req.headers)
    const refreshToken = cookies[COOKIES.REFRESH_TOKEN]
    const acessToken = cookies[COOKIES.ACCESS_TOKEN]

    if (refreshToken) {
      await googleApi.revokeAccessToken(refreshToken)
    }

    if (acessToken) {
      await googleApi.revokeAccessToken(acessToken)
    }

    deleteAllCookies(response)

    return response
  },
}
