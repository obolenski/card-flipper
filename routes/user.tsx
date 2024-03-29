import { Handlers, PageProps } from '$fresh/server.ts'
import Main from '../components/Layout/Main.tsx'
import Header from '../components/Layout/Header.tsx'
import { AppUser } from '../utils/types.ts'
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

export default function User(props: PageProps<State>) {
  const { user, googleLoginUrl, dark } = props.data
  return (
    <Main dark={dark}>
      <Head>
        <title>User | CARD FLIPPER</title>
      </Head>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
        dark={dark}
      />
      {user ? (
        <div class="w-full flex flex-col items-center justify-center flex-grow-1">
          <div
            class="h-[50%] w-[50%] 
              flex flex-col items-center justify-around
              text-4xl font-serif font-bold"
          >
            <h1>{user.email}</h1>
          </div>
        </div>
      ) : (
        <div
          class="w-full flex flex-col items-center justify-center flex-grow-1
                    text-4xl font-serif font-bold"
        >
          <p>You are not logged in</p>
          <a href={googleLoginUrl}>Log in</a>
        </div>
      )}
    </Main>
  )
}
