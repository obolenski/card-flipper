/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Header from "./Header.tsx";

export default function Main(
  { children }: { children: h.JSX.Element[] | h.JSX.Element },
) {
  return (
    <main
      class={tw`w-screen min-h-screen
      bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900
      antialiased absolute flex flex-grow-1`}
    >
      <div
        class={tw`w-screen min-h-screen
        bg-black bg-opacity-50 flex flex-grow-1`}
      >
        <div
          class={tw`mx-auto w-screen min-h-screen
        flex items-center justify-around flex-grow-1 flex-col`}
        >
          <Header />
          {children}
        </div>
      </div>
    </main>
  );
}
