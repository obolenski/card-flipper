import { h } from "preact/src/index";
import {
  CardIcon,
  CategoryIconFilled,
  CircleIcon,
  MenuIcon,
  OutlinedHeart,
  PlusIcon,
} from "../Icons.tsx";
import NavLink from "./NavLink.tsx";
import CategoriesCollapsible from "../../islands/CategoriesCollapsible.tsx";

export const Drawer = (
  props: { path: string; authorized: boolean },
): h.JSX.Element => (
  <div class="group" tabIndex={0}>
    <div class="rounded-2xl p-2 cursor-pointer
        hover:(bg-gray-200 bg-opacity-10)
        active:(bg-gray-200 bg-opacity-20)
        transition-all">
      <MenuIcon />
    </div>
    <div class="fixed top-0 -translate-x-full z-10
            overflow-auto
            h-screen sm:min-w-[20vw] min-w-[80vw]
            flex flex-col
            shadow-2xl dark:bg-gray-900 bg-gray-200
            font-mono whitespace-nowrap 
            transition-all duration-300
            group-hover:(translate-x-0) group-focus:(translate-x-0)">
      <div class="p-2 border(b-1 gray-200 opacity-20) text-center">
        <h1 class="text-2xl font-bold">
          MENU
        </h1>
      </div>
      <NavLink
        href="/"
        icon={<CardIcon />}
        text="Flip cards"
        path={props.path}
      />
      {props.authorized && (
        <NavLink
          href="/submit"
          icon={<PlusIcon />}
          text="Create cards"
          path={props.path}
        />
      )}
      <NavGroup heading="Browse cards:">
        <NavLink
          href="/tables/all"
          icon={<CircleIcon />}
          text="All"
          path={props.path}
        />
        {props.authorized
          ? (
            <NavLink
              href="/tables/fav"
              icon={<OutlinedHeart />}
              text="Favourites"
              path={props.path}
            />
          )
          : <></>}
        <CategoriesCollapsible />
      </NavGroup>
    </div>
  </div>
);

interface NavGroupProps {
  children: h.JSX.Element[] | h.JSX.Element;
  heading: string;
}

const NavGroup = (props: NavGroupProps) => {
  return (
    <div class="flex flex-col my-3 
      transition-all duration-300
      group">
      <p class="p-1 text-sm">{props.heading}</p>
      <div class="flex flex-col">
        {props.children}
      </div>
    </div>
  );
};
