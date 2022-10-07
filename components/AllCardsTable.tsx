import { AppUser, LanguageCard, UserFavs } from "../utils/types.ts";
import LikeButton from "../islands/LikeButton.tsx";

interface CardTableProps {
  cards: LanguageCard[];
  user?: AppUser;
  userFavs?: UserFavs;
}

export default function AllCardsTable(props: CardTableProps) {
  const rows = props.cards.map((card) => (
    <tr
      key={card._id}
      class="font-bold group table-row
      border(t-1 b-1 gray-200 opacity-20)
      hover:(bg-gray-200 bg-opacity-20 shadow-xl) transition-all duration-300"
    >
      <td class="p-3 m-3)">
        {card.sourceLangText}
      </td>
      <td class="sm:(text-xl) p-3 m-3">
        {card.targetLangText}
      </td>
      <td class="p-3 m-3">
        {card.targetLangTranscription}
      </td>
      {props.user && (
        <td class="m-3">
          <LikeButton
            currentId={card._id}
            favCards={props.userFavs?.cardIds ?? []}
            user={props.user}
          />
        </td>
      )}
    </tr>
  ));
  return (
    <div class="w-full h-full">
      <div class="w-full flex justify-center">
        <script src="https://tofsjonas.github.io/sortable/sortable.js"></script>
        <table class="table-fixed font-serif text-xs sm:text-base sortable">
          <thead class="text-left">
            <tr>
              <th class="p-3 m-3 btn-nobg">
                Original
              </th>
              <th class="p-3 m-3 btn-nobg">
                Translation
              </th>
              <th class="p-3 m-3 max-w-full) max-w-[3rem] btn-nobg truncate">
                Transcription
              </th>
              {props.user && (
                <th class="p-3 m-3">
                  Fav
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
}
