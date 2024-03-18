"use client";

import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import { useActionStore } from "@/stores/actionSlice";
import clsx from "clsx";

export default function POS({ children }: { children: React.ReactNode }) {
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  return (
    <div className="contents">
      <SideMenu />
      <main className={"main"}>
        <TopMenu className="md:hidden block z-30 fixed bg-background w-full" />
        <div className="p-6 h-auto md:h-full w-full bg-paper md:mt-0 mt-[52px]">
          {children}
        </div>
      </main>
    </div>
  );
}
