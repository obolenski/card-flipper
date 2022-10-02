import { h } from "preact/src/index";

export default function Main(
  { children }: { children: h.JSX.Element[] | h.JSX.Element },
) {
  return (
    <main
      class={`w-screen min-h-screen 
      text-gray-200 text-opacity-50
      bg-gray-800
      antialiased absolute flex flex-grow-1`}
    >
      <div class="mx-auto w-screen min-h-screen
          flex items-center justify-around flex-grow-1 flex-col">
        {children}
      </div>
    </main>
  );
}
