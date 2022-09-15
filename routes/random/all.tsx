import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser, LanguageCard, UserFavs } from "../../utils/types.ts";
import Main from "../../components/Main.tsx";
import RandomCard from "../../islands/RandomCard.tsx";
import * as mongoApi from "../../services/mongoApi.ts";
import Header from "../../components/Header.tsx";

export const handler: Handlers<{
  cards: LanguageCard[];
  user: AppUser;
  userFavs: UserFavs;
  googleLoginUrl: string;
}> = {
  async GET(req, ctx) {
    const user = ctx.state.user as AppUser;

    const [cards, userFavs] = await Promise.all([
      mongoApi.getAllCards(),
      mongoApi.getUserFavs(user?.email),
    ]);

    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    return ctx.render({
      cards: cards,
      user: user,
      userFavs: userFavs,
      googleLoginUrl: googleLoginUrl,
    });
  },
};

export default function Random(
  props: PageProps<{
    cards: LanguageCard[];
    user: AppUser;
    userFavs: UserFavs;
    googleLoginUrl: string;
  }>,
) {
  const { cards, user, googleLoginUrl, userFavs } = props.data;
  return (
    <Main>
      <Header user={user} googleLoginUrl={googleLoginUrl} />
      <RandomCard cards={cards} userFavs={userFavs} />
    </Main>
  );
}