import { h } from "preact";
import { useEffect } from "preact/hooks";
import { computed, effect, useSignal } from "@preact/signals";
import { hotkeys } from "https://esm.sh/@ekwoka/hotkeys@1.0.1";
import { AppUser, LanguageCard, UserFavs } from "../utils/types.ts";
import { cardCategories as allCategories } from "../utils/cardCategories.ts";
import { emptyCard } from "../utils/emptyCard.ts";
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
  const workingCards = useSignal(props.allCards);
  const workingPoolCount = computed(() => workingCards.value.length);
  const currentCard = useSignal<LanguageCard>(emptyCard);
  const counter = useSignal(1);
  const favCards = useSignal<string[]>(props.userFavs?.cardIds || []);
  const favOnlyMode = useSignal(false);
  const randomMode = useSignal(true);
  const activeCategories = useSignal(allCategories);

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * workingPoolCount.value);
    return workingCards.value[randomIndex];
  };

  const getNextCard = () => {
    const currentIndex = workingCards.value.findIndex((card) =>
      card._id == currentCard.value._id
    );
    return workingCards.value[(currentIndex + 1) % workingPoolCount.value];
  };

  const serveNewCard = () => {
    counter.value++;
    if (workingPoolCount.value == 0) currentCard.value = emptyCard;
    if (randomMode.value) currentCard.value = getRandomCard();
    else currentCard.value = getNextCard();
  };

  useEffect(
    () => {
      currentCard.value = getRandomCard();
      const unregister = hotkeys({
        " ": () => serveNewCard(),
      });
      return (() => unregister());
    },
    [],
  );

  effect(() => {
    let newCards = props.allCards;
    if (favOnlyMode.value) {
      newCards = newCards.filter((card) => favCards.value.includes(card._id));
    }
    newCards = newCards.filter((card) =>
      activeCategories.value.includes(card.category)
    );
    workingCards.value = newCards;
  });

  const onToggleFavOnlyMode = (e: h.JSX.TargetedEvent) =>
    favOnlyMode.value = (e.target as HTMLInputElement)?.checked;

  const onToggleRandomMode = (e: h.JSX.TargetedEvent) =>
    randomMode.value = (e.target as HTMLInputElement)?.checked;

  const onActiveCategoryChange = (categories: string[]) => {
    activeCategories.value = categories;
  };

  return (
    <div class="w-full h-full">
      <div class="w-full sm:h-full h-[90%]
      flex items-center justify-around flex-col">
        <div class="dark:(text-gray-200 text-opacity-20) text-gray-900 text-opacity-40 text-xs font-light font-mono flex flex-wrap justify-around items-center min-w-[40vw] transition-all duration-300">
          <div class="mx-5">
            counter:{" "}
            <span class="dark:(text-yellow-200 text-opacity-80) text-yellow-500 text-opacity-80">
              {counter}
            </span>{" "}
            (<a
              class="cursor-pointer dark:(text-gray-200 text-opacity-20) text-gray-900 text-opacity-40 active:text-opacity-60 hover:(text-opacity-40 dark:text-opacity-40) transition-all duration-300"
              onClick={() => counter.value = 1}
            >
              reset
            </a>)
          </div>
          <div class="mx-5">
            Cards in current pool:{" "}
            <span
              class={`${
                workingPoolCount.value == 0
                  ? "text-red-500 animate-pulse"
                  : "dark:(text-yellow-200 text-opacity-80) text-yellow-500 text-opacity-80"
              }`}
            >
              {workingPoolCount} / {props.allCards.length}
            </span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-around min-w-[40vw] font-light font-mono text-sm transition-all">
          {props.user && (
            <Toggle
              checked={favOnlyMode.value}
              onInput={onToggleFavOnlyMode}
              id="favonly"
            >
              Only favs
            </Toggle>
          )}
          <Toggle
            checked={randomMode.value}
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
          <Card card={currentCard.value ?? {}} />
        </div>
        <div class="flex items-center justify-center">
          {props.user && (
            <LikeButton
              currentId={currentCard.value?._id ?? ""}
              favCards={favCards.value}
              user={props.user}
              setFavCards={(newVal: string[]) => {
                favCards.value = newVal;
              }}
            />
          )}
          <a
            id="nextButton"
            onClick={() => serveNewCard()}
            class="btn-nobg"
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
    </div>
  );
}
