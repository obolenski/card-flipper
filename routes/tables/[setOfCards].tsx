import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser, LanguageCard, UserFavs } from "../../utils/types.ts";
import AllCardsTable from "../../components/AllCardsTable.tsx";
import Main from "../../components/Layout/Main.tsx";
import Header from "../../components/Layout/Header.tsx";
import * as mongoApi from "../../services/mongoApi.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers<{
  cards: LanguageCard[];
  user: AppUser;
  userFavs: UserFavs;
  googleLoginUrl: string;
  dark: boolean;
}> = {
  async GET(req, ctx) {
    const allowedPaths = ["all", "fav"];
    const lastUrlSegment = req.url.split("?")[0].split("/").pop() ?? "";

    if (!allowedPaths.includes(lastUrlSegment)) {
      return ctx.renderNotFound();
    }

    const user = ctx.state.user as AppUser;

    if (lastUrlSegment == "fav" && !user) {
      return ctx.renderNotFound();
    }

    const [allCards, userFavs] = await Promise.all([
      mongoApi.getAllCards(),
      mongoApi.getUserFavs(user?.email),
    ]);

    const cards = lastUrlSegment == "all"
      ? allCards
      : allCards.filter((card) => userFavs.cardIds.includes(card._id));

    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    const dark = getCookies(req.headers)["darkmode"] == "true";
    return ctx.render({
      cards: cards,
      user: user,
      userFavs: userFavs,
      googleLoginUrl: googleLoginUrl,
      dark: dark,
    });
  },
};

export default function TablePage(
  props: PageProps<{
    cards: LanguageCard[];
    user: AppUser;
    userFavs: UserFavs;
    googleLoginUrl: string;
    dark: boolean;
  }>,
) {
  const { cards, user, googleLoginUrl, userFavs, dark } = props.data;
  return (
    <Main dark={dark}>
      <Header
        user={user}
        googleLoginUrl={googleLoginUrl}
        path={props.url.pathname}
        dark={dark}
      />
      <AllCardsTable cards={cards} user={user} userFavs={userFavs} />
    </Main>
  );
}
