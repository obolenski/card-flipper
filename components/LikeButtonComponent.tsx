import { h } from "preact/src/index";
import { FilledHeart, OutlinedHeart } from "./Icons.tsx";

interface LikeButtonProps {
  onClick: h.JSX.MouseEventHandler<HTMLDivElement>;
  isActive: boolean;
}

export default function LikeButtonComponent(props: LikeButtonProps) {
  return (
    <div
      class="btn-nobg"
      onClick={props.onClick}
    >
      {props.isActive
        ? (
          <span class="text-red-500 text-opacity-80 hover:(text-red-500 text-opacity-100) transition-all duration-300">
            <FilledHeart />
          </span>
        )
        : <OutlinedHeart />}
    </div>
  );
}
