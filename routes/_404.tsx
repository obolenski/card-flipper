import Main from "../components/Layout/Main.tsx";
import { UnknownPageProps } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Main dark={true}>
      <Head>
        <title>NOT FOUND | CARD FLIPPER</title>
      </Head>
      <div class="w-full flex flex-col items-center justify-center flex-grow-1">
        <div class="h-[50%] w-[50%] 
          flex flex-col items-center justify-around
          text-4xl font-serif font-bold">
          <p>¯\_(ツ)_/¯</p>
          <small>{url.pathname} page not found</small>
          <a
            href="/"
            class="p-2 m-2 w-60 rounded-2xl
            bg-white bg-opacity-10
            hover:bg-white hover:bg-opacity-20
            active:bg-white active:bg-opacity-80
            transition-all duration-300"
          >
            Go to homepage
          </a>
        </div>
      </div>
    </Main>
  );
}
