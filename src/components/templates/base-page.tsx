"use client";

import { useQueries } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@/components/molecules/loader";
import { cookieNames, removeCookie } from "@/lib/cookies";
import fetcher from "@/lib/fetcher";
import { RootState } from "@/store";
import { setBaseData } from "@/store/baseSlice";

export default function BasePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);
  const store = useSelector((state: RootState) => state.base.store);
  const dispatch = useDispatch();

  const commonRefetchConfig = {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  };

  const combinedQueries = [
    {
      queryKey: ["me"],
      queryFn: () => fetcher("/authentication/me"),
      ...commonRefetchConfig,
    },
    {
      queryKey: ["store"],
      queryFn: () => fetcher("/store"),
      ...commonRefetchConfig,
    },
  ];

  const combinedResponse = useQueries({
    queries: combinedQueries,
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  useEffect(() => {
    if (!combinedResponse.pending && combinedResponse.data[0]?.id) {
      dispatch(
        setBaseData({
          user: combinedResponse.data[0],
          store: combinedResponse.data[1],
        })
      );
    } else if (!combinedResponse.pending && combinedResponse.data[0]?.message) {
      if (combinedResponse.data[0]?.message === "INVALID_STORE_TOKEN") {
        router.push("/stores");
      } else {
        removeCookie(cookieNames.access_token);
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedResponse]);

  if (combinedResponse.pending || !store?.id) {
    return <Loader minFullScreen={true} />;
  }

  return (
    <div
      className={clsx("h-full w-full transition-all duration-300", {
        "pt-[50px]": topBarOpen,
      })}
    >
      {children}
    </div>
  );
}
