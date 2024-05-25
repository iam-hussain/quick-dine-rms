"use client";

import { useQueries } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@/components/molecules/loader";
import { cookieNames, removeCookie } from "@/lib/cookies";
import fetcher from "@/lib/fetcher";
import { RootState } from "@/store";
import { setBaseData } from "@/store/baseSlice";

export default function BasePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
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
      queryKey: ["base_order"],
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
          categories: combinedResponse.data[2].filter(
            (e: { type: string }) => e.type === "DEFAULT",
          ),
          kitchenCategories: combinedResponse.data[2].filter(
            (e: { type: string }) => e.type === "KITCHEN",
          ),
          products: combinedResponse.data[3],
          defaultOrder: combinedResponse.data[4]?.id
            ? combinedResponse.data[4]
            : null,
          order: combinedResponse.data[4]?.id ? combinedResponse.data[4] : null,
        }),
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
