import { h } from "preact/src/index";

export default function Main(
  props: { dark: boolean; children: h.JSX.Element[] | h.JSX.Element },
) {
  return (
    <main
      id="cardFlipperMain"
      class={`w-screen min-h-screen
      antialiased absolute flex flex-grow-1 ${props.dark ? "dark" : ""}`}
    >
      <div class="mx-auto w-screen min-h-screen
          flex items-center justify-around flex-grow-1 flex-col
          dark:(text-gray-200 text-opacity-50 bg-gray-800)
          text-gray-900 text-opacity-80 bg-gray-300 transition-all duration-300">
        {props.children}
      </div>
    </main>
  );
}
