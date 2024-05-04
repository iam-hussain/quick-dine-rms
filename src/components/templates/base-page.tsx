"use client";

import clsx from "clsx";
import { useQueries } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import fetcher from "@/lib/fetcher";
import Loader from "@/components/molecules/loader";
import { setBaseData } from "@/store/baseSlice";

export default function BasePage({ children }: { children: React.ReactNode }) {
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);
  const dispatch = useDispatch();

  const commonRefetchConfig = {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  };

  const combinedQueries = useQueries({
    queries: [
      {
        queryKey: ["store"],
        queryFn: () => fetcher("/store"),
        ...commonRefetchConfig,
      },
      {
        queryKey: ["categories"],
        queryFn: () => fetcher("/store/categories"),
        ...commonRefetchConfig,
      },
      {
        queryKey: ["products"],
        queryFn: () => fetcher("/store/products"),
        ...commonRefetchConfig,
      },
      {
        queryKey: ["me"],
        queryFn: () => fetcher("/authentication/me"),
        ...commonRefetchConfig,
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  if (combinedQueries.pending) {
    return <Loader minFullScreen={true} />;
  }

  if (combinedQueries.data.length) {
    dispatch(
      setBaseData({
        store: combinedQueries.data[0],
        categories: combinedQueries.data[1],
        products: combinedQueries.data[2],
        user: combinedQueries.data[3],
      })
    );
  }

  return (
    <div
      className={clsx("h-full min-h-svh w-full transition-all duration-300", {
        "pt-[50px]": topBarOpen,
      })}
    >
      {children}
    </div>
  );
}
