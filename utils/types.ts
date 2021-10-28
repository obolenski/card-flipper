export type LanguageCard = {
  _id: string
  category: string
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
  authorEmail: string
}

export type CreateLanguageCardDto = {
  category: string
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
  authorEmail: string
}

export type AppUser = {
  name: string
  email: string
  avatarUrl: string
}

export type UserFavs = {
  email: string
  cardIds: string[]
}
