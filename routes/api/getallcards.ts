import { HandlerContext } from '$fresh/server.ts'
import { LanguageCard } from '../../utils/types.ts'

const cards: LanguageCard[] = [
  {
    id: '11',
    sourceLangText: '11',
    targetLangText: 'თერთმეტი',
    targetLangTranscription: 'tertmeti',
  },
  {
    id: '12',
    sourceLangText: '12',
    targetLangText: 'თორმეტი',
    targetLangTranscription: 'tormeti',
  },
  {
    id: '13',
    sourceLangText: '13',
    targetLangText: 'ცამეტი',
    targetLangTranscription: 'tsameti',
  },
  {
    id: '14',
    sourceLangText: '14',
    targetLangText: 'თოთხმეტი',
    targetLangTranscription: 'totkhmeti',
  },
  {
    id: '15',
    sourceLangText: '15',
    targetLangText: 'თხუთმეტი',
    targetLangTranscription: 'tkhutmeti',
  },
  {
    id: '16',
    sourceLangText: '16',
    targetLangText: 'თექვსმეტი',
    targetLangTranscription: 'tekvsmeti',
  },
  {
    id: '17',
    sourceLangText: '17',
    targetLangText: 'ჩვიდმეტი',
    targetLangTranscription: 'čvidmeti',
  },
  {
    id: '18',
    sourceLangText: '18',
    targetLangText: 'თვრამეტი',
    targetLangTranscription: 'tvrameti',
  },
  {
    id: '19',
    sourceLangText: '19',
    targetLangText: 'ცხრამეტი',
    targetLangTranscription: 'tskhrameti',
  },
]

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime))
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  await stall(3000)

  return new Response(JSON.stringify(cards))
}
