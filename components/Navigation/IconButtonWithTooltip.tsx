import { h } from "preact/src/index";

interface IconButtonProps {
  href: string;
  icon: h.JSX.Element;
  tooltip: string;
}

export const IconButtonWithTooltip = (
  props: IconButtonProps,
): h.JSX.Element => (
  <div class="group
         flex items-center flex-col">
    <a
      class="rounded-2xl my-auto p-2 mx-3
        hover:bg-white hover:bg-opacity-10
        active:bg-white active:bg-opacity-20
        transition-all duration-300"
      href={props.href}
    >
      {props.icon}
    </a>

    <div class=" absolute z-[60] p-1 top-12
            rounded shadow bg(gray-50 opacity-20)
            text-gray-200 text-xs text-center font-bold 
            hidden
            group-hover:(block)">
      {props.tooltip}
    </div>
  </div>
);
