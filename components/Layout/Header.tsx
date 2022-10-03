import DarkModeToggle from "../../islands/DarkModeToggle.tsx";
import { AppUser } from "../../utils/types.ts";
import { Drawer } from "./Drawer.tsx";
import { IconButtonWithTooltip } from "./IconButtonWithTooltip.tsx";
import { LoginIcon, LogoutIcon } from "../Icons.tsx";

interface HeaderProps {
  user?: AppUser;
  googleLoginUrl: string;
  path: string;
  dark: boolean;
}

export default function Header(props: HeaderProps) {
  return (
    <div class="bg-gray-300 dark:bg-gray-800 transition-all duration-300
      w-full flex justify-between content-center
      sticky top-0 z-40">
      <div class="flex content-center flex-1">
        <Drawer path={props.path} authorized={!!props.user} />
      </div>
      <div class="flex justify-center content-center hidden sm:flex mx-auto flex-1">
        <a
          href="/"
          class="p-2 mx-auto rounded-2xl 
          text-2xl font-bold
          hover:bg-white hover:bg-opacity-10
          active:bg-white active:bg-opacity-20
          transition-all duration-300 whitespace-nowrap"
        >
          CARD FLIPPER
        </a>
      </div>
      <div class="flex justify-end content-center text-sm sm:flex-1">
        <DarkModeToggle dark={props.dark} />
        {props.user && (
          <IconButtonWithTooltip
            href="/user"
            tooltip={`Signed in as ${props.user.name}`}
            icon={
              <img
                src={props.user.avatarUrl}
                class="rounded-1/2 max-h-6"
                alt={props.user.name.split(" ")[0]}
              />
            }
          />
        )}
        {props.user
          ? (
            <IconButtonWithTooltip
              href="/logout"
              tooltip="Sign out"
              icon={<LogoutIcon />}
            />
          )
          : (
            <IconButtonWithTooltip
              href={props.googleLoginUrl}
              tooltip="Sign in"
              icon={<LoginIcon />}
            />
          )}
      </div>
    </div>
  );
}
