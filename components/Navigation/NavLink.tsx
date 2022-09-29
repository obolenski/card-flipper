import { h } from "preact/src/index";

interface NavLinkProps {
  href: string;
  text: string;
  path: string;
  icon?: h.JSX.Element;
}

export default function NavLink(props: NavLinkProps) {
  const routeMatchedClass = props.href == props.path
    ? "text-yellow-200 text-opacity-80"
    : "";
  return (
    <a
      href={props.href}
      class={`p-3 ${routeMatchedClass}
        hover:bg-white hover:bg-opacity-10 flex
        active:bg-white active:bg-opacity-20
        transition-all duration-300`}
    >
      <span class="mr-3">{props.icon}</span>
      <span class="">{props.text}</span>
    </a>
  );
}
