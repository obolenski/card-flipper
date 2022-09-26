import { h } from "preact";
import { JSXInternal } from "https://esm.sh/v94/preact@10.11.0/src/jsx.d.ts";

interface ToggleProps {
  id: string;
  checked: boolean;
  onInput: JSXInternal.GenericEventHandler<HTMLInputElement>;
  children: string | h.JSX.Element;
}

export default function Toggle(props: ToggleProps) {
  const opacity = props.checked ? "80" : "20";
  const colour = props.checked ? "yellow-200" : "gray-200";
  const onOff = props.checked ? "on" : "off";
  return (
    <div class="m-1">
      <input
        hidden
        checked={props.checked}
        id={props.id}
        type="checkbox"
        onInput={props.onInput}
      />
      <label
        class={`text-${colour} text-opacity-${opacity}
          hover:text-opacity-50 
          transition-all duration-300`}
        for={props.id}
      >
        {props.children}: {onOff}
      </label>
    </div>
  );
}
