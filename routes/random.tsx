import { Handlers, PageProps } from "$fresh/server.ts";
import Main from "../components/Main.tsx";
import { AppUser } from "../utils/types.ts";
import Header from "../components/Header.tsx";

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

export default function User(
  props: PageProps<{
    user: AppUser;
    googleLoginUrl: string;
  }>,
) {
  const { user, googleLoginUrl } = props.data;
  return (
    <Main>
      <Header user={user} googleLoginUrl={googleLoginUrl} />
      <div class="w-full flex flex-col items-center justify-center flex-grow-1
                    text-4xl text-gray-50 text-opacity-60 text-center font-serif font-bold">
        <h1 class="m-10">Flip all cards or only your favourites?</h1>
        <a
          href="/random/all"
          class="p-2 m-2 w-60 rounded-2xl
          bg-white bg-opacity-10
          hover:bg-white hover:bg-opacity-20
          active:bg-white active:bg-opacity-80
          transition-all"
        >
          All
        </a>
        <a
          href="/random/all"
          class="p-2 m-2 w-60 rounded-2xl
          bg-white bg-opacity-10
          hover:bg-white hover:bg-opacity-20
          active:bg-white active:bg-opacity-80
          transition-all"
        >
          Fav only
        </a>
      </div>
    </Main>
  );
}
