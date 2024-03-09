"use client";

import SideMenu from "@/components/organisms/side-menu";
import { useActionStore } from "@/stores/actionSlice";

export default function POS({ children }: { children: React.ReactNode }) {
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  return (
    <main className="flex relative min-h-fill w-full h-auto">
      {/* <TopMenu className="col-span-full row-span-1" /> */}
      <SideMenu />
      <div className="md:p-6 p-4 h-auto w-full bg-paper">{children}</div>
    </main>
  );
}
