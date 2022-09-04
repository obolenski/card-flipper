/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Main(
  { children }: { children: h.JSX.Element[] | h.JSX.Element },
) {
  const getRandom = (arr: string[]) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };
  const gradientDirections = [
    "bg-gradient-to-t",
    "bg-gradient-to-tr",
    "bg-gradient-to-r",
    "bg-gradient-to-br",
    "bg-gradient-to-b",
    "bg-gradient-to-bl",
    "bg-gradient-to-l",
    "bg-gradient-to-tl",
  ];

  const from = [
    "from-purple-900",
    "from-indigo-900",
    "from-pink-900",
    "from-pink-500",
  ];

  const via = [
    "via-purple-900",
    "via-indigo-900",
    "via-pink-900",
    "via-pink-500",
  ];

  const to = [
    "to-purple-900",
    "to-indigo-900",
    "to-pink-900",
    "to-pink-500",
  ];
  return (
    <main
      class={tw`w-screen min-h-screen text-gray-200
      ${getRandom(gradientDirections)} ${getRandom(from)} ${getRandom(via)} ${
        getRandom(to)
      }
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
          {children}
        </div>
      </div>
    </main>
  );
}
