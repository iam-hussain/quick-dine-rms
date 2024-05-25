"use client";

import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@/components/molecules/loader";
import fetcher from "@/lib/fetcher";
import { RootState } from "@/store";
import { setTokens } from "@/store/baseSlice";
import { SortTokensResult } from "@/types";

export default function TokensProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { enableKitchenCategory } = useSelector(
    (state: RootState) => state.base.featureFlags
  );
  const { data, isPending, isLoading } = useQuery<SortTokensResult>({
    queryKey: ["tokens"],
    queryFn: () =>
      fetcher(
        `/store/tokens?category=${enableKitchenCategory ? "true" : "false"}`
      ),
  });

  useEffect(() => {
    if (!isPending && data) {
      dispatch(
        setTokens({
          placed: data?.placed || [],
          scheduled: data?.scheduled || [],
          completed: data?.completed || [],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isPending || isLoading || !data) {
    return <Loader />;
  }

  return <Fragment>{children}</Fragment>;
}
