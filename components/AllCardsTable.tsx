/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { LanguageCard } from "../utils/types.ts";

interface CardTableProps {
  cards: LanguageCard[];
}

export default function AllCardsTable(props: CardTableProps) {
  const rows = props.cards.map((card) => (
    <tr
      key={card._id}
      class={tw` font-bold group
      hover:(bg-white bg-opacity-10 shadow) transition-all 
      `}
    >
      <td
        class={tw`p-3 m-3 border-1 border-opacity-10 border-gray-50`}
      >
        {card.sourceLangText}
      </td>
      <td
        class={tw`p-3 m-3 border-1 border-opacity-10 border-gray-50 text-xl`}
      >
        {card.targetLangText}
      </td>
      <td
        class={tw`p-3 m-3 border-1 border-opacity-10 border-gray-50`}
      >
        {card.targetLangTranscription}
      </td>
    </tr>
  ));
  return (
    <div
      class={tw`w-[50%] h-full flex-grow-1`}
    >
      <table
        class={tw`table-fixed w-full
      text-gray-200 text-opacity-80 font-serif`}
      >
        <thead>
          <tr>
            <th class={tw`p-3 m-3 text-gray-300 text-opacity-60`}>
              English
            </th>
            <th class={tw`p-3 m-3 text-gray-300 text-opacity-60`}>
              Translation
            </th>
            <th class={tw`p-3 m-3 text-gray-300 text-opacity-60`}>
              Transcription
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
