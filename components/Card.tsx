import { LanguageCardVM } from "../utils/types.ts";
import { useEffect } from "preact/hooks";
import { hotkeys } from "https://esm.sh/v92/@ekwoka/hotkeys@1.0.1/dist/index";
import { computed, useSignal } from "@preact/signals";

interface CardProps {
  card: LanguageCardVM;
}

export default function Card(props: CardProps) {
  const flipped = useSignal(false);

  const Front = () => {
    return (
      <div class="text-2xl sm:text-6xl">
        {props.card.sourceLangText}
      </div>
    );
  };

  const Back = () => {
    return (
      <>
        <div class="text-2xl sm:text-6xl">{props.card.targetLangText}</div>
        <div class="text-xl sm:text-4xl">
          {props.card.targetLangTranscription}
        </div>
      </>
    );
  };
  const flip = () => {
    flipped.value = !flipped.value;
  };

  useEffect(
    () => {
      const unregister = hotkeys({
        "shift": () => {
          flip();
        },
      });
      return (() => unregister());
    },
    [],
  );

  return (
    <div
      onClick={flip}
      class="cursor-pointer h-full w-full z-0 relative
    flex flex-col justify-around items-center
    bg-gray-200 dark:(bg-gray-200 bg-opacity-20) font-serif font-bold
    rounded-xl shadow-xl
    hover:(shadow-2xl bg-gray-100 dark:(bg-gray-200 bg-opacity-30))
    transition-all duration-300"
    >
      {flipped.value ? <Back /> : <Front />}
      <div class="absolute bottom-3 block w-full 
            text-center opacity-50 text-xs font-light">
        click to flip
      </div>
    </div>
  );
}
