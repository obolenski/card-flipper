/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Main from "../components/Main.tsx";
import { tw } from "../utils/twind.ts";
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
  if (!user) {
    return (
      <Main>
        <Header user={user} googleLoginUrl={googleLoginUrl} />
        <div
          class={tw`w-full flex flex-col items-center justify-center flex-grow-1
          text-4xl text-gray-50 text-opacity-40 font-serif font-bold`}
        >
          <p>You are not logged in</p>
          <a href={googleLoginUrl}>Log in</a>
        </div>
      </Main>
    );
  }
  return (
    <Main>
      <Header user={user} googleLoginUrl={googleLoginUrl} />
      <div
        class={tw`w-full flex flex-col items-center justify-center flex-grow-1`}
      >
        <div
          class={tw`h-[50%] w-[50%] 
              flex flex-col items-center justify-around
              text-4xl text-gray-50 text-opacity-40 font-serif font-bold`}
        >
          <h1>{user.email}</h1>
        </div>
      </div>
    </Main>
  );
}
