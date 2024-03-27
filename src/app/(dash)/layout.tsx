"use client";

import { useEffect, useState } from "react";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import { useStoreStore } from "@/stores/storeSlice";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

export default function POS({ children }: { children: React.ReactNode }) {
  const [isTopBarHidden, setHideTopBar] = useState(false);
  const setStoreData = useStoreStore((state) => state.setStoreData);

  const { data } = useQuery({
    queryKey: ["store"],
    queryFn: () => instance.get("/store") as any,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data) {
      setStoreData(data);
    }
  }, [data, setStoreData]);

  return (
    <div className="main-wrapper">
      <SideMenu />
      <main className={"page-main bg-paper"}>
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
