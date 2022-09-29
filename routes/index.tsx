import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser, LanguageCard, UserFavs } from "../utils/types.ts";
import Main from "../components/Navigation/Main.tsx";
import Header from "../components/Navigation/Header.tsx";
import CardFlipper from "../islands/CardFlipper.tsx";
import * as mongoApi from "../services/mongoApi.ts";

export const handler: Handlers<{
  cards: LanguageCard[];
  user?: AppUser;
  userFavs?: UserFavs;
  googleLoginUrl: string;
}> = {
  async GET(req, ctx) {
    const user = ctx.state.user as AppUser;
    const googleLoginUrl = ctx.state.googleLoginUrl as string;

    if (!user) {
      const cards = await mongoApi.getAllCards();
      return ctx.render({
        cards: cards,
        googleLoginUrl: googleLoginUrl,
      });
    }

    const [cards, userFavs] = await Promise.all([
      mongoApi.getAllCards(),
      mongoApi.getUserFavs(user?.email),
    ]);
    return ctx.render({
      cards: cards,
      user: user,
      userFavs: userFavs,
      googleLoginUrl: googleLoginUrl,
    });
  },
};

export default function MainPage(
  props: PageProps<{
    cards: LanguageCard[];
    user?: AppUser;
    userFavs?: UserFavs;
    googleLoginUrl: string;
  }>,
) {
  const { cards, user, googleLoginUrl, userFavs } = props.data;
  return (
    <Main>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
      />
      <CardFlipper allCards={cards} userFavs={userFavs} />
    </Main>
  );
}
