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
      class="font-bold group
      hover:(bg-white bg-opacity-10 shadow) transition-all duration-300"
    >
      <td class="sm:(p-3 m-3)">
        {card.sourceLangText}
      </td>
      <td class="sm:(p-3 m-3 text-xl)">
        {card.targetLangText}
      </td>
      <td class="sm:(p-3 m-3)">
        {card.targetLangTranscription}
      </td>
      <td class="sm:(p-3 m-3)">
        {card.category}
      </td>
      {props.user && (
        <td class="">
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
    <div class="w-full h-full flex justify-center content-center">
      <script src="https://tofsjonas.github.io/sortable/sortable.js"></script>
      <table class="font-serif text-xs sm:text-base sortable">
        <thead>
          <tr>
            <th class="sm:(p-3 m-3)">
              Original
            </th>
            <th class="sm:(p-3 m-3)">
              Translation
            </th>
            <th class="sm:(p-3 m-3)">
              Transcription
            </th>
            <th class="sm:(p-3 m-3)">
              Category
            </th>
            {props.user && (
              <th class="sm:(p-3 m-3)">
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
  );
}
