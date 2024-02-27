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
  const minimize = useActionStore((state) => state.isSideBarOpen);
  const setMinimize = useActionStore((state) => state.setSideBarOpen);

  return (
    <Container
      className={clsx(
        "border-b-4 border-paper w-full h-full pr-6 md:pl-6 min-h-[54px]",
        className
      )}
      display={"flex_row_between"}
    >
      <div className="flex justify-center align-middle items-center">
        <Button
          variant={"transparent"}
          className={clsx("flex font-normal md:hidden", {
            "text-inactive-foreground": minimize,
            "text-primary": !minimize,
          })}
          onClick={() => setMinimize()}
        >
          <Icon
            name={minimize ? "IoClose" : "HiMenuAlt2"}
            className={clsx("h-5 w-5")}
          />
        </Button>
        <div className="flex gap-4 justify-center">
          <BrandSideBySide
            className={clsx("h-[40px] py-2 md:ml-0 ml-2 w-auto", {
              // "w-auto md:w-[240px]": !minimize,
              // "w-auto md:pl-6": minimize,
            })}
          />
          <h1>QuickDine</h1>
          <SearchBar className="md:flex hidden min-w-96" />
        </div>
      </div>

      <div className="flex justify-center align-middle items-center gap-2">
        <ThemeModeToggle />
        {/* <UserMenu /> */}
        <Button className="flex gap-2" variant={"secondary"}>
          <Icon name="MdTableRestaurant" className="h-4 w-4" />
          Select Table
        </Button>
      </div>
    </Container>
  );
}

export default TopMenu;
