import { AppUser } from "../../utils/types.ts";
import { Drawer } from "./Drawer.tsx";
import { IconButtonWithTooltip } from "./IconButtonWithTooltip.tsx";
import { LoginIcon, LogoutIcon } from "./Icons.tsx";

interface HeaderProps {
  user?: AppUser;
  googleLoginUrl: string;
  path: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div class="text-gray-50 text-opacity-80 bg-gray-800
      w-full flex justify-center content-center
      sticky top-0 z-40">
      <div class="flex-1 flex-grow-1
        flex content-center">
        <Drawer path={props.path} authorized={!!props.user} />
      </div>
      <div class="flex-1 
        flex justify-center content-center">
        <a
          href="/"
          class="p-2 rounded-2xl 
          hover:bg-white hover:bg-opacity-10
          active:bg-white active:bg-opacity-20
          transition-all duration-300 whitespace-nowrap"
        >
          <h1 class="text-2xl font-bold">CARD FLIPPER</h1>
        </a>
      </div>
      <div class="flex-1 
           flex justify-end content-center text-sm">
        {props.user && (
          <IconButtonWithTooltip
            href="/user"
            tooltip={`Signed in as ${props.user.name}`}
            icon={
              <img
                src={props.user.avatarUrl}
                class="rounded-1/2 h-6"
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
