import { createRef } from "preact";
interface Link {
  href: string;
  text: string;
}

interface CollapsibleNavGroupProps {
  links: Link[];
  title: string;
  startExpanded?: boolean;
}

export default function CollapsibleNavGroup(props: CollapsibleNavGroupProps) {
  const collapsibleRef = createRef();

  const zeroHeight = "max-h-0";
  const nonZeroHeight = `max-h-[${props.links.length * 50}px]`;

  const toggleCollapsible = () => {
    const collapsible = collapsibleRef.current;
    collapsible.classList.toggle(zeroHeight);
    collapsible.classList.toggle(nonZeroHeight);
  };

  const expanded = props.startExpanded ?? false;
  const initialHeight = expanded ? nonZeroHeight : zeroHeight;

  return (
    <div class="flex flex-col group">
      <div class={`hidden ${nonZeroHeight} ${zeroHeight} `}></div>
      <div
        class="p-3 cursor-pointer
          hover:bg-white hover:bg-opacity-10 
          active:bg-white active:bg-opacity-20"
        onClick={toggleCollapsible}
      >
        {props.title}
      </div>
      <div
        ref={collapsibleRef}
        class={`flex flex-col 
        transition-all duration-300 
        overflow-hidden ${initialHeight}`}
      >
        {props.links.map((link) => <ClientSideNavLink link={link} />)}
      </div>
    </div>
  );
}

function ClientSideNavLink(props: { link: Link }) {
  return (
    <a
      href={props.link.href}
      class={`p-3 pl-6
      hover:bg-white hover:bg-opacity-10 
      active:bg-white active:bg-opacity-20
      transition-all duration-300`}
    >
      {props.link.text}
    </a>
  );
}
