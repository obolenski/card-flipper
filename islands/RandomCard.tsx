import { useEffect, useState } from "preact/hooks";
import { LanguageCard, UserFavs } from "../utils/types.ts";
import Card from "../components/Card.tsx";
import { hotkeys } from "https://esm.sh/@ekwoka/hotkeys@1.0.1";
import LikeButtonComponent from "../components/LikeButtonComponent.tsx";

interface RandomCardProps {
  cards: LanguageCard[];
  userFavs: UserFavs;
}
export default function RandomCard(props: RandomCardProps) {
  const [currentCard, setCurrentCard] = useState<LanguageCard>();
  const [counter, setCounter] = useState(1);
  const [flipVisibility, setFlipVisibility] = useState(false);
  const [favCards, setFavCards] = useState(props.userFavs.cardIds);

  const userEmail = props.userFavs.email;

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * props.cards.length);
    return props.cards[randomIndex];
  };

  const serveNewCard = () => {
    setCounter(counter + 1);
    setCurrentCard(getRandomCard());
  };

  const onLikeButtonClick = () => {
    if (!currentCard) return;

    const alreadyFav = favCards.includes(currentCard._id);

    if (alreadyFav) {
      setFavCards(favCards.filter((c) => {
        return c !== currentCard._id;
      }));
    } else {
      setFavCards([
        ...favCards,
        currentCard._id,
      ]);
    }

    const method = alreadyFav ? "DELETE" : "POST";

    const data = {
      email: userEmail,
      cardId: currentCard._id,
    };

    fetch(`/api/fav`, {
      method: method,
      body: JSON.stringify(data),
    });
  };

  useEffect(
    () => {
      setCurrentCard(getRandomCard());
    },
    [],
  );

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
    <div class="h-full w-full
      flex items-center justify-center flex-col sm:flex-row">
      <div class="flex-1
        flex items-center justify-center flex-col 
        text-white text-opacity-20">
      </div>
      <div class="flex-1 h-full flex items-center justify-center flex-col min-w-[80vw] sm:min-w-[20vw]">
        {currentCard &&
          <Card card={currentCard} flipVisibility={flipVisibility} />}
        <p class="text-white text-opacity-20 absolute bottom-5">
          counter: {counter} (<a
            class="cursor-pointer text-white text-opacity-20 active:text-opacity-60 hover:text-opacity-40"
            onClick={() => setCounter(1)}
          >
            reset
          </a>)
        </p>
      </div>
      <div class="flex-1 flex items-center justify-center flex-col">
        <a
          onClick={() => serveNewCard()}
          class="font-bold text-white bg-gray-900 shadow rounded-2xl p-5 bottom-20 active:bg-gray-600 hover:bg-gray-800 hover:shadow-2xl transition-all"
        >
          ANOTHER
        </a>
        {currentCard && (
          <LikeButtonComponent
            onClick={onLikeButtonClick}
            isActive={favCards.includes(currentCard._id)}
          />
        )}

        <p class="text-white text-opacity-20">
          (hotkey: spacebar
          <svg
            class="inline"
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
