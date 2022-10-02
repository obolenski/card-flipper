import { h } from "preact";

interface ToggleProps {
  id: string;
  checked: boolean;
  onInput: h.JSX.GenericEventHandler<HTMLInputElement>;
  children: string | h.JSX.Element;
}

export default function Toggle(props: ToggleProps) {
  const opacity = props.checked
    ? "text-opacity-80 dark:text-opacity-80"
    : "text-opacity-40 dark:text-opacity-20";
  const colour = props.checked
    ? "dark:text-yellow-200 text-yellow-500"
    : "dark:text-gray-200 text-gray-900";
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
        class={`${colour} ${opacity}
          hover:(text-opacity-50 dark:text-opacity-50)
          transition-all duration-300`}
        for={props.id}
      >
        {props.children}: {onOff}
      </label>
    </div>
  );
}
