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
      class="font-bold group
      hover:(bg-white bg-opacity-10 shadow) transition-all duration-300"
    >
      <td class="p-3 m-3">
        {card.sourceLangText}
      </td>
      <td class="p-3 m-3 text-xl">
        {card.targetLangText}
      </td>
      <td class="p-3 m-3">
        {card.targetLangTranscription}
      </td>
      <td class="p-3 m-3">
        {card.category}
      </td>
      {props.user && (
        <td class="">
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
              Original
            </th>
            <th class="p-3 m-3 text-gray-300 text-opacity-60">
              Translation
            </th>
            <th class="p-3 m-3 text-gray-300 text-opacity-60">
              Transcription
            </th>
            <th class="p-3 m-3 text-gray-300 text-opacity-60">
              Category
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
