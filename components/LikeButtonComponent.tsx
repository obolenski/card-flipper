import { h } from "preact/src/index";
import { FilledHeart, OutlinedHeart } from "./Navigation/Icons.tsx";

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
          <span class="text-red-500">
            <FilledHeart />
          </span>
        )
        : <OutlinedHeart />}
    </div>
  );
}
