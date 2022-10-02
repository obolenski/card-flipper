import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { hotkeys } from "https://esm.sh/@ekwoka/hotkeys@1.0.1";
import { AppUser, LanguageCard, UserFavs } from "../utils/types.ts";
import { cardCategories as allCategories } from "../utils/cardCategories.ts";
import Card from "../components/Card.tsx";
import Toggle from "../components/Toggle.tsx";
import MultiSelect from "../components/MultiSelect.tsx";
import LikeButton from "./LikeButton.tsx";
import { NextIcon } from "../components/Icons.tsx";

interface CardFlipperProps {
  allCards: LanguageCard[];
  userFavs?: UserFavs;
  user?: AppUser;
}
export default function CardFlipper(props: CardFlipperProps) {
  const [workingCards, setWorkingCards] = useState(props.allCards);
  const [currentCard, setCurrentCard] = useState<LanguageCard>();
  const [counter, setCounter] = useState(1);
  const [flipVisibility, setFlipVisibility] = useState(false);
  const [favCards, setFavCards] = useState<string[]>(
    props.userFavs?.cardIds || [],
  );
  const [favOnlyMode, setFavOnlyMode] = useState(false);
  const [randomMode, setRandomMode] = useState(true);
  const [activeCategories, setActiveCategories] = useState(allCategories);
  const didMount = useRef(false);

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * workingCards.length);
    return workingCards[randomIndex];
  };

  const getNextCard = () => {
    const currentIndex = workingCards.findIndex((card) =>
      card._id == currentCard?._id
    );
    return workingCards[(currentIndex + 1) % workingCards.length];
  };

  const serveNewCard = () => {
    setCounter((prev) => prev + 1);
    if (randomMode) setCurrentCard(getRandomCard());
    else setCurrentCard(getNextCard);
  };

  useEffect(
    () => {
      setCurrentCard(getRandomCard());
      const unregister = hotkeys({
        " ": () => {
          serveNewCard();
        },
        "shift": () => setFlipVisibility((prev) => !prev),
      });
      return (() => unregister());
    },
    [],
  );

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    let newCards = props.allCards;
    if (favOnlyMode) {
      newCards = newCards.filter((card) => favCards.includes(card._id));
    }
    newCards = newCards.filter((card) =>
      activeCategories.includes(card.category)
    );
    setWorkingCards(newCards);
  }, [favOnlyMode, activeCategories, favCards]);

  const onToggleFavOnlyMode = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => setFavOnlyMode((e.target as HTMLInputElement)?.checked);

  const onToggleRandomMode = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => setRandomMode((e.target as HTMLInputElement)?.checked);

  const onActiveCategoryChange = (categories: string[]) => {
    setActiveCategories(categories);
  };

  return (
    <div class="h-full w-full
      flex items-center justify-around flex-col">
      <div class="dark:(text-gray-200 text-opacity-20) text-gray-900 text-opacity-40 text-xs font-light font-mono flex flex-wrap justify-around items-center min-w-[40vw] transition-all duration-300">
        <div class="mx-5">
          counter:{" "}
          <span class="dark:(text-yellow-200 text-opacity-80) text-yellow-500 text-opacity-80">
            {counter}
          </span>{" "}
          (<a
            class="cursor-pointer dark:(text-gray-200 text-opacity-20) text-gray-900 text-opacity-40 active:text-opacity-60 hover:(text-opacity-40 dark:text-opacity-40) transition-all duration-300"
            onClick={() => setCounter(1)}
          >
            reset
          </a>)
        </div>
        <div class="mx-5">
          Cards in current pool:{" "}
          <span
            class={`${
              workingCards.length == 0
                ? "text-red-500 animate-pulse"
                : "dark:(text-yellow-200 text-opacity-80) text-yellow-500 text-opacity-80"
            }`}
          >
            {workingCards.length} / {props.allCards.length}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-around min-w-[40vw] font-light font-mono text-sm transition-all">
        {props.user && (
          <Toggle
            checked={favOnlyMode}
            onInput={onToggleFavOnlyMode}
            id="favonly"
          >
            Only favs
          </Toggle>
        )}
        <Toggle
          checked={randomMode}
          onInput={onToggleRandomMode}
          id="randommode"
        >
          Random
        </Toggle>
        <MultiSelect
          onSelectionChange={onActiveCategoryChange}
          options={allCategories}
          defaultSelectedItems={allCategories}
          labelText="Categories"
        />
      </div>
      <div class="flex items-center justify-center flex-col min-w-[80vw] sm:min-w-[33vw] min-h-[50%]">
        <Card
          card={currentCard ??
            {
              sourceLangText: "",
              targetLangText: "",
              targetLangTranscription: "",
            }}
          flipVisibility={flipVisibility}
        />
      </div>
      <div class="flex items-center justify-center">
        {props.user && (
          <LikeButton
            currentId={currentCard?._id ?? ""}
            favCards={favCards}
            user={props.user}
            setFavCards={setFavCards}
          />
        )}
        <a
          id="nextButton"
          onClick={() => serveNewCard()}
          class="btn-sqr"
        >
          <NextIcon />
        </a>
      </div>
      <div class="dark:(text-gray-200 text-opacity-20) text-gray-900 text-opacity-40 text-xs font-light font-mono justify-around items-center min-w-[40vw] hidden sm:flex">
        <div>
          <kbd class="kbd">shift</kbd> flip card
        </div>
        <div>
          <kbd class="kbd">space</kbd> next
        </div>
      </div>
    </div>
  );
}
