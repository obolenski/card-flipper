import { StateUpdater, useEffect, useRef, useState } from "preact/hooks";
import LikeButtonComponent from "../components/LikeButtonComponent.tsx";
import { AppUser } from "../utils/types.ts";

interface LikeButtonProps {
  currentId: string;
  user: AppUser;
  favCards: string[];
  setFavCards?: StateUpdater<string[]>;
}
export default function LikeButton(
  props: LikeButtonProps,
) {
  const { currentId, user, favCards, setFavCards } = props;
  const [isActive, setIsActive] = useState(favCards.includes(currentId));

  const didMount = useRef(false);

  const onClick = () => {
    if (currentId == "") return;
    setIsActive(!isActive);
  };
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (setFavCards) {
      if (!isActive) {
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

    const method = isActive ? "POST" : "DELETE";

    const data = {
      email: user.email,
      cardId: currentId,
    };

    fetch(`/api/fav`, {
      method: method,
      body: JSON.stringify(data),
    });
  }, [isActive]);

  useEffect(() => {
    setIsActive(favCards.includes(currentId));
  }, [props.currentId]);

  return (
    <LikeButtonComponent
      onClick={onClick}
      isActive={isActive}
    />
  );
}
