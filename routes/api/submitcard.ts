import { Handlers } from '$fresh/server.ts'
import { MongoAPIBaseUrl, MongoApiKey } from '../../utils/env.ts'
import * as axiod from 'https://deno.land/x/axiod@0.20.0-0/mod.ts'

export const handler: Handlers = {
  async POST(req, _ctx) {
    const card = await req.json()

    const data = JSON.stringify({
      collection: 'cards',
      database: 'langCards',
      dataSource: 'aws-eu-west-3',
      document: card,
    })

    const config = {
      method: 'post',
      url: `${MongoAPIBaseUrl}/insertOne`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': MongoApiKey,
      },
      data: data,
    }

    let response

    await axiod
      .default(config)
      .then((res) => {
        console.log(res.data)
        response = new Response(JSON.stringify(res.data))
      })
      .catch(function (error) {
        console.log(error)
      })
    return response ?? new Response()
  },
}
