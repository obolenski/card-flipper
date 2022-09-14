import { LanguageCard } from "../utils/types.ts";

interface CardProps {
  card: LanguageCard;
  flipVisibility: boolean;
}

export default function Card(props: CardProps) {
  return (
    <div class="cursor-pointer h-3/4 sm:h-1/2 w-full min-w-max relative m-auto ease-in group">
      <div class="h-full w-full min-w-max absolute 
        bg-white bg-opacity-10 text-gray-200 font-serif font-bold
        rounded-2xl shadow-xl
        group-hover:shadow-2xl transition-all">
        <div
          class={props.flipVisibility
            ? "h-full w-full min-w-max absolute overflow-hidden flex items-center justify-around flex-col opacity-0 group-hover:opacity-100 transition-all"
            : "h-full w-full absolute overflow-hidden flex items-center justify-around flex-col group-hover:opacity-0 transition-all"}
        >
          <div class="text-6xl">{props.card.sourceLangText}</div>
        </div>
        <div
          class={props.flipVisibility
            ? "h-full w-full min-w-max absolute overflow-hidden flex items-center justify-around flex-col group-hover:opacity-0 transition-all"
            : "h-full w-full absolute overflow-hidden flex items-center justify-around flex-col opacity-0 group-hover:opacity-100 transition-all"}
        >
          <div class="text-6xl">{props.card.targetLangText}</div>
          <div class="text-4xl">
            {props.card.targetLangTranscription}
          </div>
        </div>
        <div class="absolute bottom-0 block w-full 
            text-center opacity-50 text-xs">
          hover or press shift to flip the card
        </div>
      </div>
    </div>
  );
}
