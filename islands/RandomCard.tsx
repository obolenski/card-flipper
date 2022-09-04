/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { LanguageCard } from "../utils/types.ts";
import Card from "../components/Card.tsx";
import { hotkeys } from "https://esm.sh/@ekwoka/hotkeys@1.0.1";

interface RandomCardProps {
  cards: LanguageCard[];
}
export default function RandomCard(props: RandomCardProps) {
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * props.cards.length);
    return props.cards[randomIndex];
  };

  const [currentCard, setCurrentCard] = useState(getRandomCard());
  const [counter, setCounter] = useState(1);
  const [flipVisibility, setFlipVisibility] = useState(false);

  const serveNewCard = () => {
    setCounter(counter + 1);
    setCurrentCard(getRandomCard());
  };
  useEffect(
    () => {
      const unregister = hotkeys({
        " ": () => {
          serveNewCard();
        },
        "shift": () => setFlipVisibility(!flipVisibility),
      });
      return (() => unregister());
    },
    [counter, flipVisibility],
  );
  return (
    <div
      class={tw`h-full w-full
    flex items-center justify-center flex-col sm:flex-row`}
    >
      <div
        class={tw`flex-1
      flex items-center justify-center flex-col 
    text-white text-opacity-20`}
      >
      </div>
      <div
        class={tw`flex-1 h-full flex items-center justify-center flex-col min-w-[80vw] sm:min-w-[20vw]`}
      >
        <Card card={currentCard} flipVisibility={flipVisibility} />
        <p class={tw`text-white text-opacity-20 absolute bottom-5`}>
          counter: {counter} (<a
            class={tw`cursor-pointer text-white text-opacity-20 active:text-opacity-60 hover:text-opacity-40`}
            onClick={() => setCounter(1)}
          >
            reset
          </a>)
        </p>
      </div>
      <div
        class={tw`flex-1 flex items-center justify-center flex-col`}
      >
        <a
          onClick={() => serveNewCard()}
          class={tw`font-bold text-white bg-gray-900 shadow rounded-2xl p-5 bottom-20 active:bg-gray-600 hover:bg-gray-800 hover:shadow-2xl transition-all`}
        >
          ANOTHER
        </a>
        <p class={tw`text-white text-opacity-20`}>
          (hotkey: spacebar
          <svg
            class={tw`inline`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            style="fill: rgba(255, 255, 255, 0.2);transform: ;msFilter:;"
          >
            <path d="M17 13H7V9H5v6h14V9h-2z"></path>
          </svg>)
        </p>
      </div>
    </div>
  );
}
