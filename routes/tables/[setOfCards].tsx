import { Handlers, PageProps } from '$fresh/server.ts'
import { AppUser, LanguageCard, UserFavs } from '../../utils/types.ts'
import AllCardsTable from '../../components/AllCardsTable.tsx'
import Main from '../../components/Layout/Main.tsx'
import Header from '../../components/Layout/Header.tsx'
import * as db from '../../services/mongoApi.ts'
import { getCookies } from '$std/http/cookie.ts'
import { Head } from '$fresh/src/runtime/head.ts'
import { cardCategories as allCategories } from '../../utils/cardCategories.ts'

interface State {
  cards: LanguageCard[]
  user?: AppUser
  userFavs?: UserFavs
  googleLoginUrl: string
  dark: boolean
}

export const handler: Handlers<State> = {
  async GET(req, ctx) {
    const allowedPaths = ['all', 'fav', ...allCategories]
    const lastUrlSegment = req.url.split('?')[0].split('/').pop() ?? ''

    if (!allowedPaths.includes(lastUrlSegment)) {
      return ctx.renderNotFound()
    }

    const user = ctx.state.user as AppUser

    if (lastUrlSegment == 'fav' && !user) {
      return ctx.renderNotFound()
    }

    const [allCards, userFavs] = await Promise.all([
      db.getAllCards(),
      db.getUserFavs(user?.email),
    ])

    const cards =
      lastUrlSegment == 'all'
        ? allCards
        : lastUrlSegment == 'fav'
        ? allCards.filter(card => userFavs.cardIds.includes(card._id))
        : allCards.filter(card => card.category == lastUrlSegment)

    const googleLoginUrl = ctx.state.googleLoginUrl as string
    const dark = getCookies(req.headers)['darkmode'] == 'true'
    return ctx.render({
      cards: cards,
      user: user,
      userFavs: userFavs,
      googleLoginUrl: googleLoginUrl,
      dark: dark,
    })
  },
}

export default function TablePage(props: PageProps<State>) {
  const { cards, user, googleLoginUrl, userFavs, dark } = props.data
  const category = props.url.pathname.split('?')[0].split('/').pop() ?? ''
  return (
    <Main dark={dark}>
      <Head>
        <title>{category} | CARD FLIPPER</title>
      </Head>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
        dark={dark}
      />
      <div class="font-light font-mono text-sm">Category: {category}</div>
      <AllCardsTable cards={cards} user={user} userFavs={userFavs} />
    </Main>
  )
}
