"use client";

import clsx from "clsx";
import { useQueries } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import fetcher from "@/lib/fetcher";
import Loader from "@/components/molecules/loader";
import { setBaseData } from "@/store/baseSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { cookieNames, removeCookie } from "@/lib/cookies";

export default function BasePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);
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
  ];

  if (orderId) {
    combinedQueries.push({
      queryKey: [`order_${orderId}`],
      queryFn: () => fetcher(`/store/order/${orderId}`),
      ...commonRefetchConfig,
    });
  }

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
          categories: combinedResponse.data[2],
          products: combinedResponse.data[3],
          order: combinedResponse.data[4]?.id ? combinedResponse.data[4] : null,
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

  if (combinedResponse.pending) {
    return <Loader minFullScreen={true} />;
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
