import * as axiod from 'https://deno.land/x/axiod@0.20.0-0/mod.ts'
import { MongoAPIBaseUrl, MongoApiKey, MongoCluster } from '../utils/env.ts'
import { LanguageCard, UserFavs } from '../utils/types.ts'

export const getAllCards = async (): Promise<LanguageCard[]> => {
  refreshCardsInCache()
  const cachedCards = await getFromCache('db', 'cards')
  if (cachedCards) {
    return cachedCards
  }
  const cards = await getAllCardsFromDb()
  return cards
}

const getAllCardsFromDb = async (): Promise<LanguageCard[]> => {
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
    .then((res) => {
      return res.data.documents
    })
    .catch(function (error) {
      console.log(error)
    })

  return cards
}

const refreshCardsInCache = async () => {
  const cards = await getAllCardsFromDb()
  saveToCache('db', 'cards', cards)
}

export const getUserFavs = async (email: string): Promise<UserFavs> => {
  refreshUserFavsInCache(email)
  const cachedFavs = await getFromCache('db', `favs-${email}`)
  if (cachedFavs) {
    return cachedFavs
  }
  const userFavs = await getUserFavsFromDb(email)
  return userFavs
}

const getUserFavsFromDb = async (email: string): Promise<UserFavs> => {
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
    .then((res) => res.data.document)
    .catch(function (error) {
      console.log(error)
    })

  return userFavs
}

const refreshUserFavsInCache = async (email: string) => {
  const favs = await getUserFavsFromDb(email)
  saveToCache('db', `favs-${email}`, favs)
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
  refreshUserFavsInCache(email)
  return await axiod.default(config).catch((e) => console.log(e))
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
  refreshUserFavsInCache(email)
  return await axiod.default(config).catch((e) => console.log(e))
}

const getFromCache = async (cacheName: string, key: string) => {
  const CACHE = await caches.open(cacheName)
  const res = await CACHE.match(`https:/localhost/${key}`)
  return await res?.json()
}

const saveToCache = async (
  cacheName: string,
  key: string,
  value: Record<string, unknown> | Record<string, unknown>[]
) => {
  const CACHE = await caches.open(cacheName)
  const response = new Response(JSON.stringify(value))
  await CACHE.put(`https:/localhost/${key}`, response.clone())
}
