import { useEffect, useState } from "preact/hooks";
import LikeButtonComponent from "../components/LikeButtonComponent.tsx";

interface LikeButtonProps {
  activeOnFirstRender: boolean;
  cardId: string;
  email: string;
}
export default function LikeButton(props: LikeButtonProps) {
  const [isActive, setIsActive] = useState(props.activeOnFirstRender);

  const onClick = async () => {
    const method = isActive ? "DELETE" : "POST";

    setIsActive(!isActive);
    const data = {
      email: props.email,
      cardId: props.cardId,
    };

    await fetch(`/api/fav`, {
      method: method,
      body: JSON.stringify(data),
    });
  };

  return <LikeButtonComponent onClick={onClick} isActive={isActive} />;
}
