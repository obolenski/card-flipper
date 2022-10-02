import { h } from "preact/src/index";
import { FilledHeart, OutlinedHeart } from "./Icons.tsx";

interface LikeButtonProps {
  onClick: h.JSX.MouseEventHandler<HTMLDivElement>;
  isActive: boolean;
}

export default function LikeButtonComponent(props: LikeButtonProps) {
  return (
    <div
      class="btn-sqr"
      onClick={props.onClick}
    >
      {props.isActive
        ? (
          <span class="text-red-500 text-opacity-80">
            <FilledHeart />
          </span>
        )
        : <OutlinedHeart />}
    </div>
  );
}
