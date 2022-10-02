import { h } from "preact";

interface DropdownOptionProps {
  checked: boolean;
  optionName: string;
  onInput: h.JSX.GenericEventHandler<HTMLInputElement>;
}

export default function MultiSelectOption(props: DropdownOptionProps) {
  const opacity = props.checked ? "80" : "20";
  return (
    <div class="flex flex-col">
      <input
        hidden
        checked={props.checked}
        onInput={props.onInput}
        name={props.optionName}
        id={`${props.optionName}-input`}
        type="checkbox"
      />
      <label
        class={`text-gray-200 text-opacity-${opacity}
        p-3
        hover:bg-white hover:bg-opacity-10 
        active:bg-white active:bg-opacity-20
        transition-all duration-300`}
        for={`${props.optionName}-input`}
      >
        {props.optionName}
      </label>
    </div>
  );
}
