/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { LanguageCard } from "../utils/types.ts";
import Header from "../components/Header.tsx";
import RandomCard from "../islands/RandomCard.tsx";
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

export default function Random(
  props: PageProps<{
    cards: LanguageCard[];
  }>,
) {
  const { cards } = props.data;
  return (
    <div
      class={tw`mx-auto w-screen h-screen
      bg-gradient-to-b from-purple-900 via-indigo-900 to-pink-900
      antialiased absolute`}
    >
      <div
        class={tw`mx-auto w-screen h-screen 
        bg-black bg-opacity-50 absolute`}
      >
        <div
          class={tw`mx-auto w-screen h-screen 
        flex items-center justify-around flex-col`}
        >
          <Header />
          <RandomCard cards={cards} />
        </div>
      </div>
    </div>
  );
}
