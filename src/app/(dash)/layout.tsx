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
      <main className={"page-main bg-foreground/10"}>
        <TopMenu
          className="block z-30 fixed bg-background w-full"
          isHidden={isTopBarHidden}
          setHidden={setHideTopBar}
        />
        <div
          className={clsx(
            "h-full min-h-svh md:h-screen w-full transition-all duration-300",
            {
              "pt-[50px]": !isTopBarHidden,
            }
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
