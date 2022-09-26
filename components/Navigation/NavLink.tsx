interface NavLinkProps {
  href: string;
  text: string;
  path: string;
}

export default function NavLink(props: NavLinkProps) {
  const routeMatchedClass = props.href == props.path
    ? "bg-gray-200 bg-opacity-10"
    : "";
  return (
    <a
      href={props.href}
      class={`p-3 ${routeMatchedClass}
        hover:bg-white hover:bg-opacity-10 
        active:bg-white active:bg-opacity-20
        transition-all duration-300`}
    >
      {props.text}
    </a>
  );
}
