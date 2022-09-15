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
    const allowedPaths = ["all", "fav"];
    const lastUrlSegment = req.url.split("?")[0].split("/").pop() ?? "";

    if (!allowedPaths.includes(lastUrlSegment)) {
      return ctx.renderNotFound();
    }

    const user = ctx.state.user as AppUser;

    const [allCards, userFavs] = await Promise.all([
      mongoApi.getAllCards(),
      mongoApi.getUserFavs(user?.email),
    ]);

    const cards = lastUrlSegment == "all"
      ? allCards
      : allCards.filter((card) => userFavs.cardIds.includes(card._id));

    const googleLoginUrl = ctx.state.googleLoginUrl as string;
    return ctx.render({
      cards: cards,
      user: user,
      userFavs: userFavs,
      googleLoginUrl: googleLoginUrl,
    });
  },
};

export default function TablePage(
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
      <AllCardsTable cards={cards} user={user} userFavs={userFavs} />
    </Main>
  );
}
