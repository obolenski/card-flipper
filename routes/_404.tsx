import Main from "../components/Main.tsx";
import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Main>
      <div class="w-full flex flex-col items-center justify-center flex-grow-1">
        <div class="h-[50%] w-[50%] 
          flex flex-col items-center justify-around
          text-4xl text-gray-50 text-opacity-40 font-serif font-bold">
          <p>¯\_(ツ)_/¯</p>
          <small>{url.pathname} page not found</small>
          <a
            href="/"
            class="font-bold p-2 rounded-2xl
            bg-gray-900 bg-opacity-50
            hover:bg-white hover:bg-opacity-10
            active:bg-white active:bg-opacity-20
            transition-all"
          >
            Go to homepage
          </a>
        </div>
      </div>
    </Main>
  );
}
