export type LanguageCard = {
  [key: string]: string
  _id: string
  category: string
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
  authorEmail: string
}

export type LanguageCardVM = {
  [key: string]: string
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
}

export type CreateLanguageCardDto = {
  [key: string]: string
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

export interface MWState {
  user?: AppUser
  googleLoginUrl: string
}
