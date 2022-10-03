import { Handlers } from '$fresh/server.ts'
import * as mongoApi from '../../services/mongoApi.ts'

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = await req.json()
    const email = data.email ?? ''
    const cardId = data.cardId ?? ''
    mongoApi.addCardIdToUserFavs(email, cardId).catch((e) => console.log(e))
    return new Response()
  },
  async DELETE(req, _ctx) {
    const data = await req.json()
    const email = data.email ?? ''
    const cardId = data.cardId ?? ''
    mongoApi
      .deleteCardIdFromUserFavs(email, cardId)
      .catch((e) => console.log(e))
    return new Response()
  },
}
