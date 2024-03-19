"use client";

import { useState } from "react";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import clsx from "clsx";

export default function POS({ children }: { children: React.ReactNode }) {
  const [isTopBarHidden, setHideTopBar] = useState(false);

  return (
    <div className="main-wrapper">
      <SideMenu />
      <main
        className={clsx("page-main bg-paper", {
          // "pt-[50px]": !isTopBarHidden,
        })}
        id="scrolls"
      >
        <TopMenu
          className="block z-30 fixed bg-background w-full"
          isHidden={isTopBarHidden}
          setHidden={setHideTopBar}
        />
        <div
          className={clsx("p-6 h-auto w-full transition-all duration-300", {
            "pt-[74px]": !isTopBarHidden,
          })}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
