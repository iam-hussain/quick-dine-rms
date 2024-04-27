"use client";

import { useEffect, useState } from "react";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import { useStoreStore } from "@/stores/storeSlice";
import { Skeleton } from "@/components/atoms/skeleton";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { cookieNames, deleteCookie } from "@/lib/cookies";
import { useActionStore } from "@/stores/actionSlice";

export default function POS({ children }: { children: React.ReactNode }) {
  const setStoreData = useStoreStore((state) => state.setStoreData);
  const isTopBarHidden = useActionStore((state) => state.isTopBarHidden);
  const setHideTopBar = useActionStore((state) => state.setHideTopBar);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["store"],
    queryFn: () => instance.get("/store") as any,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data) {
      console.log({ data });
      setStoreData(data);
    }
  }, [data, setStoreData]);

  if (isError) {
    deleteCookie(cookieNames.access_token);
    window.location.href = "/";
  }

  if (isLoading || !isSuccess) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

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
            "h-full min-h-svh w-full transition-all duration-300",
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
