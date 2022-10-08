import { Handlers } from '$fresh/server.ts'
import * as db from '../../services/mongoApi.ts'

export const handler: Handlers = {
  async POST(req, ctx) {
    if (!ctx.state.user) return new Response('Forbidden')
    const data = await req.json()
    const email = data.email ?? ''
    const cardId = data.cardId ?? ''
    db.addCardIdToUserFavs(email, cardId).catch((e) => console.log(e))
    return new Response()
  },
  async DELETE(req, ctx) {
    if (!ctx.state.user) return new Response('Forbidden')
    const data = await req.json()
    const email = data.email ?? ''
    const cardId = data.cardId ?? ''
    db.deleteCardIdFromUserFavs(email, cardId).catch((e) => console.log(e))
    return new Response()
  },
}
