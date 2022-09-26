import { useEffect, useState } from "preact/hooks";
import { LanguageCard, UserFavs } from "../utils/types.ts";
import Card from "../components/Card.tsx";
import { hotkeys } from "https://esm.sh/@ekwoka/hotkeys@1.0.1";
import LikeButtonComponent from "../components/LikeButtonComponent.tsx";
import { RepeatIcon } from "../components/Navigation/Icons.tsx";
import { JSXInternal } from "https://esm.sh/v94/preact@10.11.0/src/jsx.d.ts";
import { Toggle } from "./Toggle.tsx";

interface RandomCardProps {
  allCards: LanguageCard[];
  userFavs: UserFavs;
}
export default function RandomCard(props: RandomCardProps) {
  const allCardsSorted = props.allCards.sort((a, b) =>
    a.sourceLangText.localeCompare(b.sourceLangText)
  );

  const [wokingCards, setWorkingCards] = useState(allCardsSorted);
  const [currentCard, setCurrentCard] = useState<LanguageCard>();
  const [counter, setCounter] = useState(1);
  const [flipVisibility, setFlipVisibility] = useState(false);
  const [favCards, setFavCards] = useState(props.userFavs.cardIds);
  const [favOnlyMode, setFavOnlyMode] = useState(false);
  const [randomMode, setRandomMode] = useState(true);

  const userEmail = props.userFavs.email;

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * wokingCards.length);
    return wokingCards[randomIndex];
  };

  const getNextCard = () => {
    const currentIndex = wokingCards.findIndex((card) =>
      card._id == currentCard?._id
    );
    return wokingCards[(currentIndex + 1) % wokingCards.length];
  };

  const serveNewCard = () => {
    setCounter((prev) => prev + 1);
    if (randomMode) setCurrentCard(getRandomCard());
    else setCurrentCard(getNextCard);
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

  useEffect(() => {
    if (favOnlyMode) {
      const favs = allCardsSorted.filter((card) => favCards.includes(card._id));
      setWorkingCards(favs);
    } else setWorkingCards(allCardsSorted);
  }, [favOnlyMode]);

  useEffect(
    () => {
      const unregister = hotkeys({
        " ": () => {
          const nextBtn = document.getElementById("nextButton");
          nextBtn?.classList.remove("bg-opacity-20");
          nextBtn?.classList.add("bg-opacity-80");
          nextBtn?.click();
          setTimeout(() => {
            nextBtn?.classList.remove("bg-opacity-80");
            nextBtn?.classList.add("bg-opacity-20");
          }, 200);
        },
        "shift": () => setFlipVisibility((prev) => !prev),
      });
      return (() => unregister());
    },
    [],
  );

  const onToggleFavOnlyMode = (
    e: JSXInternal.TargetedEvent<HTMLInputElement, Event>,
  ): void => setFavOnlyMode((e.target as HTMLInputElement)?.checked);

  const onToggleRandomMode = (
    e: JSXInternal.TargetedEvent<HTMLInputElement, Event>,
  ): void => setRandomMode((e.target as HTMLInputElement)?.checked);

  return (
    <div class="h-full w-full
      flex items-center justify-around flex-col">
      <div class="hidden text-opacity-5"></div>
      <div class="text-white text-opacity-20 text-xs font-light font-mono">
        counter: {counter} (<a
          class="cursor-pointer text-white text-opacity-20 active:text-opacity-60 hover:text-opacity-40 transition-all duration-300"
          onClick={() => setCounter(1)}
        >
          reset
        </a>)
      </div>
      <div class="flex items-center justify-around min-w-[40vh]">
        <Toggle
          checked={favOnlyMode}
          onInput={onToggleFavOnlyMode}
          id="favonly"
        >
          Only favs
        </Toggle>
        <Toggle
          checked={randomMode}
          onInput={onToggleRandomMode}
          id="randommode"
        >
          Random
        </Toggle>
      </div>
      <div class="flex items-center justify-center flex-col min-w-[80vw] sm:min-w-[33vw]">
        <Card
          card={currentCard ??
            {
              _id: "",
              sourceLangText: "",
              targetLangText: "",
              targetLangTranscription: "",
              category: "",
            }}
          flipVisibility={flipVisibility}
        />
      </div>
      <div class="flex items-center justify-center">
        <LikeButtonComponent
          onClick={onLikeButtonClick}
          isActive={favCards.includes(currentCard?._id ?? "")}
        />
        <a
          id="nextButton"
          onClick={() => serveNewCard()}
          class="p-3 m-5 h-12
          flex items-center
          cursor-pointer
          bg-white bg-opacity-20
          rounded-2xl shadow
          hover:(shadow-2xl bg-opacity-50)
          active:(bg-opacity-80)
          transition-all duration-300 align-middle"
        >
          <RepeatIcon />(
          <kbd class="kbd opacity-50">
            space
          </kbd>)
        </a>
      </div>
    </div>
  );
}
