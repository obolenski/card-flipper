/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { LanguageCard } from "../utils/types.ts";

interface CardProps {
  card: LanguageCard;
}

export default function Card(props: CardProps) {
  return (
    <div
      class={tw`cursor-pointer h-96 w-72 relative m-auto ease-in perspective800`}
    >
      <div
        class={tw`h-96 w-72 absolute preserve3d transition04 hover:rotate-Y shadow-xl rounded`}
      >
        <div
          class={tw`h-96 w-72 backface-hidden absolute overflow-hidden bg-purple-200 text-gray-900 rounded flex items-center justify-around flex-col`}
        >
          <div class={tw`text-4xl`}>{props.card.sourceLangText}</div>
        </div>
        <div
          class={tw`h-96 w-72 backface-hidden absolute overflow-hidden bg-purple-200 text-gray-900 rounded rotate-Y flex items-center justify-around flex-col `}
        >
          <div class={tw`text-4xl`}>{props.card.targetLangText}</div>
          <div class={tw`text-2xl`}>
            {props.card.targetLangTranscription}
          </div>
        </div>
      </div>
    </div>
  );
}
