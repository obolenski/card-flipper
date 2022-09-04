import { Handlers } from 'https://deno.land/x/fresh@1.0.2/server.ts'
import * as mongoApi from '../../services/mongoApi.ts'

export const handler: Handlers = {
  async POST(req, ctx) {
    const data = await req.json()
    const email = data.email ?? ''
    const cardId = data.cardId ?? ''
    mongoApi.addCardIdToUserFavs(email, cardId).catch((e) => console.log(e))
    return new Response()
  },
  async DELETE(req, ctx) {
    const data = await req.json()
    const email = data.email ?? ''
    const cardId = data.cardId ?? ''
    mongoApi
      .deleteCardIdFromUserFavs(email, cardId)
      .catch((e) => console.log(e))
    return new Response()
  },
}
