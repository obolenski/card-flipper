import { Handlers, PageProps } from '$fresh/server.ts'
import { AppUser } from '../utils/types.ts'
import Main from '../components/Layout/Main.tsx'
import Header from '../components/Layout/Header.tsx'
import CardCreator from '../islands/CardCreator.tsx'
import { getCookies } from '$std/http/cookie.ts'
import { Head } from '$fresh/src/runtime/head.ts'

interface State {
  user: AppUser
  googleLoginUrl: string
  dark: boolean
}

export const handler: Handlers<State> = {
  GET(req, ctx) {
    const user = ctx.state.user as AppUser
    if (!user) {
      return ctx.renderNotFound()
    }
    const googleLoginUrl = ctx.state.googleLoginUrl as string
    const dark = getCookies(req.headers)['darkmode'] == 'true'
    return ctx.render({
      user: user,
      googleLoginUrl: googleLoginUrl,
      dark: dark,
    })
  },
}

export default function Submit(props: PageProps<State>) {
  const { user, googleLoginUrl, dark } = props.data
  return (
    <Main dark={dark}>
      <Head>
        <title>Create cards | CARD FLIPPER</title>
      </Head>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
        dark={dark}
      />
      <CardCreator user={user} />
    </Main>
  )
}
