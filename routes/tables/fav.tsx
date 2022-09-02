/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser, LanguageCard, UserFavs } from "../../utils/types.ts";
import AllCardsTable from "../../components/AllCardsTable.tsx";
import Main from "../../components/Main.tsx";
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
    const userFavs = await mongoApi.getUserFavs(user?.email);
    const cards = await mongoApi.getCardsByIds(userFavs?.cardIds);
    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    return ctx.render({
      cards: cards,
      user: user,
      userFavs: userFavs,
      googleLoginUrl: googleLoginUrl,
    });
  },
};

export default function Fav(
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
      <a href="/tables/all">all</a>
      <AllCardsTable cards={cards} user={user} userFavs={userFavs} />
    </Main>
  );
}
