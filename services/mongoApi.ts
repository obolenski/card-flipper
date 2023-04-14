import * as axiod from 'https://deno.land/x/axiod@0.20.0-0/mod.ts'
import { MongoAPIBaseUrl, MongoApiKey, MongoCluster } from '../utils/env.ts'
import { LanguageCard, UserFavs } from '../utils/types.ts'

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
    .then(res => res.data.documents)
    .catch(function (error) {
      console.log(error)
    })

  return cards ?? new Array<LanguageCard>()
}

export const getCardsByIds = async (ids: string[]): Promise<LanguageCard[]> => {
  const data = JSON.stringify({
    collection: 'cards',
    database: 'langCards',
    dataSource: MongoCluster,
    filter: {
      _id: { $in: ids },
    },
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
    .then(res => res.data.documents)
    .catch(function (error) {
      console.log(error)
    })

  return cards ?? new Array<LanguageCard>()
}

export const getUserFavs = async (email: string): Promise<UserFavs> => {
  const data = JSON.stringify({
    collection: 'userFavs',
    database: 'langCards',
    dataSource: MongoCluster,
    filter: {
      email: email,
    },
  })

  const config = {
    method: 'post',
    url: `${MongoAPIBaseUrl}/findOne`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': MongoApiKey,
    },
    data: data,
  }

  const userFavs = await axiod
    .default(config)
    .then(res => res.data.document)
    .catch(function (error) {
      console.log(error)
    })

  return userFavs ?? new Array<LanguageCard>()
}

export const addCardIdToUserFavs = async (email: string, cardId: string) => {
  const data = JSON.stringify({
    collection: 'userFavs',
    database: 'langCards',
    dataSource: MongoCluster,
    filter: {
      email: email,
    },
    update: {
      $addToSet: {
        cardIds: cardId,
      },
    },
    upsert: true,
  })

  const config = {
    method: 'post',
    url: `${MongoAPIBaseUrl}/updateOne`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': MongoApiKey,
    },
    data: data,
  }

  return await axiod.default(config).catch(e => console.log(e))
}

export const deleteCardIdFromUserFavs = async (
  email: string,
  cardId: string
) => {
  const data = JSON.stringify({
    collection: 'userFavs',
    database: 'langCards',
    dataSource: MongoCluster,
    filter: {
      email: email,
    },
    update: {
      $pull: {
        cardIds: cardId,
      },
    },
    upsert: false,
  })

  const config = {
    method: 'post',
    url: `${MongoAPIBaseUrl}/updateOne`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': MongoApiKey,
    },
    data: data,
  }

  return await axiod.default(config).catch(e => console.log(e))
}
