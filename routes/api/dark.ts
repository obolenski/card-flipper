import { Handlers } from '$fresh/server.ts'
import { setCookie } from '$std/http/cookie.ts'

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = await req.json()
    const darkMode = data.darkMode
    const response = new Response('ok')
    setCookie(response.headers, {
      name: 'darkmode',
      value: JSON.stringify(darkMode),
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      path: '/',
    })
    return response
  },
}
