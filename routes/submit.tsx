import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser } from "../utils/types.ts";
import Main from "../components/Layout/Main.tsx";
import Header from "../components/Layout/Header.tsx";
import CardCreator from "../islands/CardCreator.tsx";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers<{
  user: AppUser;
  googleLoginUrl: string;
  dark: boolean;
}> = {
  GET(req, ctx) {
    const user = ctx.state.user as AppUser;
    if (!user) {
      return ctx.renderNotFound();
    }
    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    const dark = getCookies(req.headers)["darkmode"] == "true";
    return ctx.render({
      user: user,
      googleLoginUrl: googleLoginUrl,
      dark: dark,
    });
  },
};

export default function Submit(
  props: PageProps<{
    user: AppUser;
    googleLoginUrl: string;
    dark: boolean;
  }>,
) {
  const { user, googleLoginUrl, dark } = props.data;
  return (
    <Main dark={dark}>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
        dark={dark}
      />
      <CardCreator user={user} />
    </Main>
  );
}
