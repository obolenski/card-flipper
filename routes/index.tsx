import { Handlers, PageProps } from '$fresh/server.ts'
import { AppUser, LanguageCard, UserFavs } from '../utils/types.ts'
import Main from '../components/Layout/Main.tsx'
import Header from '../components/Layout/Header.tsx'
import CardFlipper from '../islands/CardFlipper.tsx'
import * as db from '../services/mongoApi.ts'
import { getCookies } from '$std/http/cookie.ts'
import { Head } from '$fresh/src/runtime/head.ts'

interface State {
  cards: LanguageCard[]
  user?: AppUser
  userFavs?: UserFavs
  googleLoginUrl: string
  dark: boolean
}

export const handler: Handlers<State> = {
  async GET(req, ctx) {
    const user = ctx.state.user as AppUser
    const googleLoginUrl = ctx.state.googleLoginUrl as string
    const dark = getCookies(req.headers)['darkmode'] == 'true'

    if (!user) {
      const cards = await db.getAllCards()
      return ctx.render({
        cards: cards,
        googleLoginUrl: googleLoginUrl,
        dark: dark,
      })
    }

    const [cards, userFavs] = await Promise.all([
      db.getAllCards(),
      db.getUserFavs(user?.email),
    ])
    return ctx.render({
      cards: cards,
      user: user,
      userFavs: userFavs,
      googleLoginUrl: googleLoginUrl,
      dark: dark,
    })
  },
}

export default function MainPage(props: PageProps<State>) {
  const { cards, user, googleLoginUrl, userFavs, dark } = props.data
  return (
    <Main dark={dark}>
      <Head>
        <title>CARD FLIPPER</title>
      </Head>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
        dark={dark}
      />
      <CardFlipper
        allCards={cards.sort((a, b) =>
          a.sourceLangText.localeCompare(b.sourceLangText)
        )}
        userFavs={userFavs}
        user={user}
      />
    </Main>
  )
}
