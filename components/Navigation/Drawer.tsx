import { h } from "preact/src/index";
import { MenuIcon } from "./Icons.tsx";
import NavLink from "./NavLink.tsx";

export const Drawer = (
  props: { path: string; authorized: boolean },
): h.JSX.Element => (
  <div class="group" tabIndex={0}>
    <div class="fixed top-0 left-0
        rounded-2xl p-2 cursor-pointer
        hover:bg-white hover:bg-opacity-10
        active:bg-white active:bg-opacity-20
        transition-all">
      <MenuIcon />
    </div>
    <div class="fixed top-0 left-[-50vw] z-10
            overflow-auto
            h-screen min-w-[20vw]
            flex flex-col
            shadow-2xl bg-gray-700
            text-gray-200 text-opacity-50 font-bold whitespace-nowrap 
            transition-all
            duration-300
            group-hover:(left-0) group-focus:(left-0)">
      <NavLink href="/" text="Flip cards" path={props.path} />
      <NavGroup heading="Browse cards:">
        <NavLink href="/tables/all" text="All" path={props.path} />
        {props.authorized
          ? <NavLink href="/tables/fav" text="Favourites" path={props.path} />
          : <></>}
      </NavGroup>
      {props.authorized && (
        <NavLink href="/submit" text="Create" path={props.path} />
      )}
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
      <p class="p-1">{props.heading}</p>
      <div class="flex flex-col">
        {props.children}
      </div>
    </div>
  );
};
