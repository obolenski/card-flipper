import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser, CreateLanguageCardDto, UserFavs } from "../utils/types.ts";
import Main from "../components/Navigation/Main.tsx";
import Header from "../components/Navigation/Header.tsx";
import CardCreator from "../islands/CardCreator.tsx";

export const handler: Handlers<{
  user: AppUser;
  googleLoginUrl: string;
  submission?: CreateLanguageCardDto;
}> = {
  GET(_req, ctx) {
    const user = ctx.state.user as AppUser;
    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    return ctx.render({
      user: user,
      googleLoginUrl: googleLoginUrl,
    });
  },
};

export default function Submit(
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
      <CardCreator user={user} />
    </Main>
  );
}
