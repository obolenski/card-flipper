/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { AppUser } from "../utils/types.ts";

interface HeaderProps {
  user: AppUser;
  googleLoginUrl: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div
      class={tw`
      bg-gray-900 text-white
      w-full flex justify-center content-center
      p-3 mb-5
      sticky top-0 z-50`}
    >
      <div
        class={tw`flex-1 flex-grow-1
        flex content-center`}
      >
        <HeaderIcon
          href="/random"
          tooltip="Random cards"
          icon={
            <svg
              fill="white"
              width="32px"
              height="32px"
              viewBox="0 -4 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m24.983 8.539v-2.485h-4.902l-3.672 5.945-2.099 3.414-3.24 5.256c-.326.51-.889.844-1.53.845h-9.54v-3.568h8.538l3.673-5.946 2.099-3.414 3.24-5.256c.325-.509.886-.843 1.525-.845h5.904v-2.485l7.417 4.27-7.417 4.27z" />
              <path d="m12.902 6.316-.63 1.022-1.468 2.39-2.265-3.675h-8.538v-3.568h9.54c.641.001 1.204.335 1.526.838l.004.007 1.836 2.985z" />
              <path d="m24.983 24v-2.485h-5.904c-.639-.002-1.201-.336-1.521-.838l-.004-.007-1.836-2.985.63-1.022 1.468-2.39 2.264 3.675h4.902v-2.485l7.417 4.27-7.417 4.27z" />
            </svg>
          }
        />
        <HeaderIcon
          href="/tables/all"
          tooltip="Browse cards"
          icon={
            <svg
              fill="white"
              width="32px"
              height="32px"
              viewBox="0 0 384.97 384.97"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03 C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z" />
              <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z" />
              <path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909 c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z" />
            </svg>
          }
        />
      </div>
      <div
        class={tw`flex-1 
        flex justify-center content-center`}
      >
        <a
          href="/"
          class={tw`font-bold p-2 rounded-2xl
      hover:bg-white hover:bg-opacity-10
      active:bg-white active:bg-opacity-20
      transition-all`}
        >
          <h1 class={tw`text-2xl`}>CARDS</h1>
        </a>
      </div>
      <div
        class={tw`flex-1 
        flex justify-end content-center text-sm`}
      >
        {props.user && (
          <HeaderIcon
            href="/user"
            tooltip={`Signed in as ${props.user.name}`}
            icon={
              <img
                src={props.user.avatarUrl}
                class={tw`rounded-1/2 h-6`}
                alt={props.user.name.split(" ")[0]}
              />
            }
          />
        )}
        <div class={tw`my-auto`}>
          {props.user
            ? (
              <HeaderIcon
                href="/logout"
                tooltip="Sign out"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    style="fill: rgba(255, 255, 255, 0.5);transform: scaleX(-1);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);"
                  >
                    <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                    <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z">
                    </path>
                  </svg>
                }
              />
            )
            : (
              <HeaderIcon
                href={props.googleLoginUrl}
                tooltip="Sign in"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"
                  >
                    <path d="m13 16 5-4-5-4v3H4v2h9z"></path>
                    <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z">
                    </path>
                  </svg>
                }
              />
            )}
        </div>
      </div>
    </div>
  );
}

interface HeaderIconProps {
  href: string;
  icon: h.JSX.Element;
  tooltip: string;
}

const HeaderIcon = (props: HeaderIconProps): h.JSX.Element => (
  <div
    class={tw` group 
  flex items-center flex-col`}
  >
    <a
      class={tw`rounded-2xl my-auto p-2 mx-3
  hover:bg-white hover:bg-opacity-10
  active:bg-white active:bg-opacity-20
  transition-all`}
      href={props.href}
    >
      {props.icon}
    </a>

    <span
      class={tw` absolute origin-top top-[3.5rem] z-[60]
      m-3 p-3
      rounded shadow bg(gray-50 opacity-20)
      text-white text-xs font-bold whitespace-nowrap 
      transition-all  
      scale-0
      group-hover:(scale-100)`}
    >
      {props.tooltip}
    </span>
  </div>
);
