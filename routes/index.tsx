import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser } from "../utils/types.ts";
import Main from "../components/Navigation/Main.tsx";
import Header from "../components/Navigation/Header.tsx";

export const handler: Handlers<{
  user: AppUser;
  googleLoginUrl: string;
}> = {
  GET(req, ctx) {
    const user = ctx.state.user as AppUser;
    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    return ctx.render({
      user: user,
      googleLoginUrl: googleLoginUrl,
    });
  },
};

export default function Home(
  props: PageProps<{
    user: AppUser;
    googleLoginUrl: string;
  }>,
) {
  const { user, googleLoginUrl } = props.data;
  return (
    <Main>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
      />
      <div class="w-full flex flex-col items-center justify-center flex-grow-1">
        <div class="h-[50%] w-[50%] 
          flex flex-col items-center justify-around
          text-4xl text-gray-50 text-opacity-40 text-center font-serif font-bold">
          <h1>Hello</h1>
          <p>Please learn words.</p>
          <small>Thank you!</small>
        </div>
      </div>
    </Main>
  );
}
