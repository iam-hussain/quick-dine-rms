"use client";

import { useRef } from "react";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
// import { useActionStore } from "@/stores/actionSlice";

export default function POS({ children }: { children: React.ReactNode }) {
  // const minimize = useActionStore((state) => state.isSideBarMinimized);
  const scrollRef = useRef(null);

  return (
    <div className="main-wrapper">
      <SideMenu />
      <main className={"main"} id="scrolls" ref={scrollRef}>
        <TopMenu
          className="md:hidden block z-30 fixed bg-background w-full"
          containerRef={scrollRef}
        />
        <div className="p-6 h-auto md:h-full w-full bg-paper md:mt-0 mt-[52px]">
          {children}
        </div>
      </main>
    </div>
  );
}
