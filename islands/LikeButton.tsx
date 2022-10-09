import { StateUpdater, useEffect, useRef, useState } from "preact/hooks";
import { FilledHeart, OutlinedHeart } from "../components/Icons.tsx";
import { AppUser } from "../utils/types.ts";

interface LikeButtonProps {
  currentId: string;
  user: AppUser;
  favCards: string[];
  setFavCards?: (a: string[]) => void;
}
export default function LikeButton(
  props: LikeButtonProps,
) {
  const { currentId, user, favCards, setFavCards } = props;
  const [isActive, setIsActive] = useState(favCards.includes(currentId));

  const onClick = () => {
    if (currentId == "") return;
    setIsActive(!isActive);
    if (setFavCards) {
      if (isActive) {
        setFavCards(favCards.filter((c) => c !== currentId));
      } else {
        setFavCards([
          ...new Set([
            ...favCards,
            currentId,
          ]),
        ]);
      }
    }

    const method = isActive ? "DELETE" : "POST";

    const data = {
      email: user.email,
      cardId: currentId,
    };

    fetch(`/api/fav`, {
      method: method,
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    setIsActive(favCards.includes(currentId));
  }, [props.currentId]);

  return (
    <div
      class="btn-nobg"
      onClick={onClick}
    >
      {isActive
        ? (
          <span class="text-red-500 text-opacity-80 hover:(text-red-500 text-opacity-100) transition-all duration-300">
            <FilledHeart />
          </span>
        )
        : <OutlinedHeart />}
    </div>
  );
}
