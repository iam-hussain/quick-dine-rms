"use client";

import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import { useActionStore } from "@/stores/actionSlice";
import clsx from "clsx";

export default function POS({ children }: { children: React.ReactNode }) {
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  return (
    <>
      <main className={"page-main"}>
        <SideMenu />
        <div
          className={clsx(
            "flex flex-col grow h-auto min-h-full transition-all w-full",
            {
              "md:pl-[60px]": minimize,
              "md:pl-[280px]": !minimize,
            }
          )}
        >
          {/* <TopMenu className="md:hidden block z-30" /> */}
          <div className="p-6 h-auto min-h-full w-auto bg-paper">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
