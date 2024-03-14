"use client";

import clsx from "clsx";
import { Container } from "@/components/atoms/container";
import Icon, { IconKey } from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";
import { useActionStore } from "@/stores/actionSlice";
import BrandSideBySide from "../atoms/brand/side-by-side";
import UserMenu from "@/components/organisms/user-menu";
import { ThemeModeToggle } from "@/components/organisms/theme-mode-toggle";
import FullScreenButton from "../molecules/full-screen-button";
import SearchBar from "./search-bar";

function TopMenu({ className }: { className?: string }) {
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  const setMinimize = useActionStore((state) => state.setSideBarMinimize);

  return (
    <nav className={clsx("border-b border-paper w-full h-auto", className)}>
      <div className="flex justify-center align-middle items-center min-h-[54px] relative">
        <Button
          variant={"transparent"}
          className={clsx("flex font-normal md:hidden absolute left-2", {
            "text-inactive-foreground": !minimize,
            "text-primary": minimize,
          })}
          onClick={() => setMinimize()}
        >
          <Icon
            name={minimize ? "HiMenuAlt2" : "IoClose"}
            className={clsx("h-5 w-5")}
          />
        </Button>
        <div className="flex gap-4 m-auto justify-center">
          <BrandSideBySide
            className={clsx("h-[40px] py-2 md:ml-0 ml-2 w-auto", {})}
          />
          <h1 className="hidden">QuickDine</h1>
        </div>
      </div>
    </nav>
  );
}

export default TopMenu;
