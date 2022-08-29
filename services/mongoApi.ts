import { HandlerContext } from '$fresh/server.ts'
import * as axiod from 'https://deno.land/x/axiod@0.20.0-0/mod.ts'
import { MongoAPIBaseUrl, MongoApiKey, MongoCluster } from '../utils/env.ts'
import { LanguageCard } from '../utils/types.ts'

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime))
}

export const getAllCards = async (): Promise<LanguageCard[]> => {
  const data = JSON.stringify({
    collection: 'cards',
    database: 'langCards',
    dataSource: MongoCluster,
  })

  const config = {
    method: 'post',
    url: `${MongoAPIBaseUrl}/find`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': MongoApiKey,
    },
    data: data,
  }

  const cards = await axiod
    .default(config)
    .then((res) => res.data.documents)
    .catch(function (error) {
      console.log(error)
    })

  return cards
}
