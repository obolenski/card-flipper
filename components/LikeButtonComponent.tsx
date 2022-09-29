import { h } from "preact/src/index";
import { FilledHeart, OutlinedHeart } from "./Navigation/Icons.tsx";

interface LikeButtonProps {
  onClick: h.JSX.MouseEventHandler<HTMLDivElement>;
  isActive: boolean;
}

export default function LikeButtonComponent(props: LikeButtonProps) {
  return (
    <div
      class="h-12 w-12 mx-auto
      flex justify-center items-center
      cursor-pointer
      bg-white bg-opacity-20
      rounded-2xl shadow
      hover:(shadow-2xl bg-opacity-50)
      active:(bg-opacity-80)
      transition-all duration-300"
      onClick={props.onClick}
    >
      {props.isActive
        ? (
          <span class="text-red-500">
            <FilledHeart />
          </span>
        )
        : <OutlinedHeart />}
    </div>
  );
}
