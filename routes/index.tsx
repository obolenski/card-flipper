/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Main from "../components/Main.tsx";

export default function Home() {
  return (
    <Main>
      <div
        class={tw`w-full flex flex-col items-center justify-center flex-grow-1`}
      >
        <div
          class={tw`h-[50%] w-[50%] 
              flex flex-col items-center justify-around
              text-4xl text-gray-50 text-opacity-40 font-serif font-bold`}
        >
          <h1>Hello</h1>
          <p>Please learn words.</p>
          <small>Thank you!</small>
        </div>
      </div>
    </Main>
  );
}
