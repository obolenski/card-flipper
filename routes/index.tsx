/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import Card from "../components/Card.tsx";
import { LanguageCard } from "../utils/types.ts";
import { BaseURL } from "../utils/env.ts";

export const handler: Handlers<{
  randomCard: LanguageCard;
}> = {
  async GET(req, ctx) {
    const cardResponse = await fetchRandomCard();
    return ctx.render({
      randomCard: cardResponse,
    });
  },
};

const fetchRandomCard = async (): Promise<LanguageCard> => {
  const cards = await fetch(`${BaseURL}/api/getallcards`)
    .then(
      (res) => res.json(),
    );
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
};

export default function Home(
  props: PageProps<{
    randomCard: LanguageCard;
  }>,
) {
  const { randomCard } = props.data;
  return (
    <div
      class={tw`mx-auto max-w-screen-2xl h-screen flex items-center justify-around bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900`}
    >
      <Card card={randomCard} />
    </div>
  );
}
