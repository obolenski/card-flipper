import { createRef, h } from "preact";
import { CategoryIconFilled } from "../Icons.tsx";
import NavLink from "./NavLink.tsx";
import { useSignal } from "@preact/signals";
interface Link {
  href: string;
  text: string;
  icon?: h.JSX.Element;
}

interface CollapsibleNavGroupProps {
  links: Link[];
  title: string;
  startExpanded?: boolean;
}

export default function CollapsibleNavGroup(props: CollapsibleNavGroupProps) {
  const expanded = useSignal(props.startExpanded);

  const zeroHeight = "max-h-0";
  const nonZeroHeight = `max-h-[${props.links.length * 50}px]`;
  const maxHeight = expanded.value ? nonZeroHeight : zeroHeight;

  const toggleCollapsible = () => {
    expanded.value = !expanded.value;
  };

  return (
    <div class="flex flex-col group">
      <div class={`hidden ${nonZeroHeight} ${zeroHeight} `}></div>
      <div
        class={`p-3 cursor-pointer flex
          ${expanded.value ? "bg-gray-200 bg-opacity-10" : ""}
          hover:bg-gray-200 hover:bg-opacity-10 
          active:bg-gray-200 active:bg-opacity-20`}
        onClick={toggleCollapsible}
      >
        <span class="mr-3">
          <CategoryIconFilled />
        </span>
        <span class="">{props.title}</span>
      </div>
      <div
        class={`flex flex-col bg-gray-200 bg-opacity-20
        transition-all duration-300 
        overflow-hidden ${maxHeight}`}
      >
        {props.links.map((link) => <ClientSideNavLink link={link} />)}
      </div>
    </div>
  );
}

function ClientSideNavLink(props: { link: Link }) {
  const path = window.location?.pathname;
  return (
    <NavLink
      href={props.link.href}
      icon={props.link.icon}
      text={props.link.text}
      path={path}
    />
  );
}
