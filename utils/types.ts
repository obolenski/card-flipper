export type LanguageCard = {
  _id: string
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
}

export type CreateLanguageCardDto = {
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
}

export type AppUser = {
  name: string
  email: string
  avatarUrl: string
  accessToken: string
}

export type UserFavs = {
  email: string
  cardIds: string[]
}
