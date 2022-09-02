/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser, LanguageCard } from "../../utils/types.ts";
import AllCardsTable from "../../components/AllCardsTable.tsx";
import Main from "../../components/Main.tsx";
import * as mongoApi from "../../services/mongoApi.ts";
import Header from "../../components/Header.tsx";

export const handler: Handlers<{
  cards: LanguageCard[];
  user: AppUser;
  googleLoginUrl: string;
}> = {
  async GET(req, ctx) {
    const cards = await mongoApi.getAllCards();
    const user = ctx.state.user as AppUser;
    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    return ctx.render({
      cards: cards,
      user: user,
      googleLoginUrl: googleLoginUrl,
    });
  },
};

export default function All(
  props: PageProps<{
    cards: LanguageCard[];
    user: AppUser;
    googleLoginUrl: string;
  }>,
) {
  const { cards, user, googleLoginUrl } = props.data;
  return (
    <Main>
      <Header user={user} googleLoginUrl={googleLoginUrl} />
      <a href="/tables/fav">favs</a>
      <AllCardsTable cards={cards} user={user} />
    </Main>
  );
}
