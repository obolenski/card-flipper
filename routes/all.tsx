/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { LanguageCard } from "../utils/types.ts";
import AllCardsTable from "../components/AllCardsTable.tsx";
import Main from "../components/Main.tsx";
import { getAllCards } from "../services/mongoApi.ts";

export const handler: Handlers<{
  cards: LanguageCard[];
}> = {
  async GET(req, ctx) {
    const cards = await getAllCards();
    return ctx.render({
      cards: cards,
    });
  },
};

export default function All(
  props: PageProps<{
    cards: LanguageCard[];
  }>,
) {
  const { cards } = props.data;
  return (
    <Main>
      <AllCardsTable cards={cards} />
    </Main>
  );
}
