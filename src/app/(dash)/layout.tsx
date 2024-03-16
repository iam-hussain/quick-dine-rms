"use client";

import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import { useActionStore } from "@/stores/actionSlice";

export default function POS({ children }: { children: React.ReactNode }) {
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  return (
    <main className="flex flex-col relative min-h-fill w-full h-full">
      <TopMenu className="md:hidden block" />
      <div className="flex w-full h-auto min-h-full">
        <SideMenu />
        <div className="md:px-12 lg:px-24 py-4 px-4 md:py-8 h-auto w-full bg-paper">
          {children}
        </div>
      </div>
    </main>
  );
}
