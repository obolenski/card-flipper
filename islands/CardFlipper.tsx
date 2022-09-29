import { useEffect, useState } from "preact/hooks";
import { AppUser, LanguageCard, UserFavs } from "../utils/types.ts";
import Card from "./Card.tsx";
import { hotkeys } from "https://esm.sh/@ekwoka/hotkeys@1.0.1";
import LikeButtonComponent from "../components/LikeButtonComponent.tsx";
import { NextIcon } from "../components/Navigation/Icons.tsx";
import { JSXInternal } from "https://esm.sh/v94/preact@10.11.0/src/jsx.d.ts";
import Toggle from "./Toggle.tsx";
import { cardCategories as allCategories } from "../utils/cardCategories.ts";
import MultiSelect from "./MultiSelect.tsx";

interface CardFlipperProps {
  allCards: LanguageCard[];
  userFavs?: UserFavs;
  user?: AppUser;
}
export default function CardFlipper(props: CardFlipperProps) {
  const allCardsSorted = props.allCards.sort((a, b) =>
    a.sourceLangText.localeCompare(b.sourceLangText)
  );

  const [workingCards, setWorkingCards] = useState(allCardsSorted);
  const [currentCard, setCurrentCard] = useState<LanguageCard>();
  const [counter, setCounter] = useState(1);
  const [flipVisibility, setFlipVisibility] = useState(false);
  const [favCards, setFavCards] = useState<string[]>(
    props.userFavs?.cardIds || [],
  );
  const [favOnlyMode, setFavOnlyMode] = useState(false);
  const [randomMode, setRandomMode] = useState(true);
  const [activeCategories, setActiveCategories] = useState(allCategories);

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

  const onLikeButtonClick = () => {
    if (!currentCard) return;
    if (!props.user) return;

    const alreadyFav = favCards.includes(currentCard._id);

    if (alreadyFav) {
      setFavCards(favCards.filter((c) => {
        return c !== currentCard._id;
      }));
    } else {
      setFavCards([
        ...new Set([
          ...favCards,
          currentCard._id,
        ]),
      ]);
    }

    const method = alreadyFav ? "DELETE" : "POST";

    const data = {
      email: props.user.email,
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
      const favs = allCardsSorted.filter((card) =>
        activeCategories.includes(card.category)
      ).filter((card) => favCards.includes(card._id));
      setWorkingCards(favs);
    } else {setWorkingCards(allCardsSorted.filter((card) =>
        activeCategories.includes(card.category)
      ));}
  }, [favOnlyMode, activeCategories]);

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
  ) => setFavOnlyMode((e.target as HTMLInputElement)?.checked);

  const onToggleRandomMode = (
    e: JSXInternal.TargetedEvent<HTMLInputElement, Event>,
  ) => setRandomMode((e.target as HTMLInputElement)?.checked);

  const onActiveCategoryChange = (categories: string[]) => {
    setActiveCategories(categories);
  };

  return (
    <div class="h-full w-full
      flex items-center justify-around flex-col">
      <div class="hidden text-opacity-5"></div>
      <div class="text-gray-200 text-opacity-20 text-xs font-light font-mono flex flex-wrap justify-around items-center min-w-[40vw] transition-all duration-300">
        <div class="mx-5">
          counter:{" "}
          <span class="text-yellow-200 text-opacity-80">{counter}</span> (<a
            class="cursor-pointer text-gray-200 text-opacity-20 active:text-opacity-60 hover:text-opacity-40 transition-all duration-300"
            onClick={() => setCounter(1)}
          >
            reset
          </a>)
        </div>
        <div class="mx-5">
          Cards in current pool:{" "}
          <span
            class={`text-${
              workingCards.length == 0 ? "red-500 animate-pulse" : "yellow-200"
            } text-opacity-80`}
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
      <div class="flex items-center justify-center text-gray-200 text-opacity-50">
        {props.user && (
          <LikeButtonComponent
            onClick={onLikeButtonClick}
            isActive={favCards.includes(currentCard?._id ?? "")}
          />
        )}
        <a
          id="nextButton"
          onClick={() => serveNewCard()}
          class="h-12 w-12 mx-3
          flex justify-center items-center
          cursor-pointer
          bg-white bg-opacity-20
          rounded-2xl shadow
          hover:(shadow-2xl bg-opacity-50)
          active:(bg-opacity-80)
          transition-all duration-300"
        >
          <NextIcon />
        </a>
      </div>
      <div class="text-gray-200 text-opacity-20 text-xs font-light font-mono justify-around items-center min-w-[40vw] hidden sm:flex">
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
