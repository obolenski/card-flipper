import { useEffect, useRef, useState } from "preact/hooks";
import { DarkIcon, LightIcon } from "../components/Icons.tsx";
export default function DarkModeToggle(props: { dark: boolean }) {
  const [darkMode, setDarkMode] = useState(props.dark);

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    fetch(`/api/dark`, {
      method: "POST",
      body: JSON.stringify({ darkMode }),
    });

    const main = document.getElementById("cardFlipperMain");
    if (darkMode) main?.classList.add("dark");
    if (!darkMode) main?.classList.remove("dark");
  }, [darkMode]);
  return (
    <div
      class="my-auto mx-3 h-5 w-5 cursor-pointer transition-all duration-300
      text-gray-900 text-opacity-50 dark:(text-gray-200 text-opacity-50)
      hover:(text-gray-900 text-opacity-70 dark:(text-gray-200 text-opacity-70))
      active:(text-gray-900 text-opacity-80 dark:(text-gray-200 text-opacity-80))"
      onClick={toggle}
    >
      {darkMode ? <DarkIcon /> : <LightIcon />}
    </div>
  );
}
