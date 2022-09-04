/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";

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

  return (
    <div
      class={tw`h-12 w-12 mx-auto
      flex justify-center items-center
      cursor-pointer
      bg-white bg-opacity-20
      rounded-2xl shadow
      hover:(shadow-2xl bg-opacity-50)
      active:(bg-opacity-80)
      transition-all`}
      onClick={onClick}
    >
      {isActive ? <FilledHeart /> : <OutlinedHeart />}
    </div>
  );
}

const OutlinedHeart = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"
    >
      <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z">
      </path>
    </svg>
  );
};

const FilledHeart = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      style="fill: rgba(200, 80, 80, 1);transform: ;msFilter:;"
    >
      <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z">
      </path>
    </svg>
  );
};
