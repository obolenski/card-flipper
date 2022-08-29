export type LanguageCard = {
  _id: string
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
}

export type LanguageCardCreationDto = {
  sourceLangText: string
  targetLangText: string
  targetLangTranscription: string
}
