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
      hover:(text-gray-900 text-opacity-70 dark:(text-gray-200 text-opacity-70))
      active:(text-gray-900 text-opacity-80 dark:(text-gray-200 text-opacity-80))
      transition-all duration-300"
      href={props.href}
    >
      {props.icon}
    </a>

    <div class="absolute z-[60] p-1 top-12
            rounded shadow bg(gray-200 opacity-20)
            text-xs text-center font-bold 
            hidden
            group-hover:(block)">
      {props.tooltip}
    </div>
  </div>
);
