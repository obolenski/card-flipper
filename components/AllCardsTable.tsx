import { AppUser, LanguageCard, UserFavs } from "../utils/types.ts";
import LikeButton from "../islands/LikeButton.tsx";

interface CardTableProps {
  cards: LanguageCard[];
  user: AppUser;
  userFavs: UserFavs;
}

export default function AllCardsTable(props: CardTableProps) {
  const rows = props.cards.map((card) => (
    <tr
      key={card._id}
      class=" font-bold group
      hover:(bg-white bg-opacity-10 shadow) transition-all"
    >
      <td class="p-3 m-3 border-1 border-opacity-10 border-gray-50">
        {card.sourceLangText}
      </td>
      <td class="p-3 m-3 border-1 border-opacity-10 border-gray-50 text-xl">
        {card.targetLangText}
      </td>
      <td class="p-3 m-3 border-1 border-opacity-10 border-gray-50">
        {card.targetLangTranscription}
      </td>
      {props.user && (
        <td class="border-1 border-opacity-10 border-gray-50">
          <LikeButton
            cardId={card._id}
            activeOnFirstRender={props.userFavs?.cardIds?.includes(card._id)}
            email={props.user.email}
          />
        </td>
      )}
    </tr>
  ));
  return (
    <div class="w-[50%] h-full flex-grow-1">
      <table class="table-auto w-full
        text-gray-200 text-opacity-80 font-serif">
        <thead>
          <tr>
            <th class="p-3 m-3 text-gray-300 text-opacity-60">
              English
            </th>
            <th class="p-3 m-3 text-gray-300 text-opacity-60">
              Translation
            </th>
            <th class="p-3 m-3 text-gray-300 text-opacity-60">
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
