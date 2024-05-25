"use client";

import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Loader from "@/components/molecules/loader";
import fetcher from "@/lib/fetcher";
import { setCategories } from "@/store/baseSlice";
import { CategoryType } from "@/types";

export default function CategoriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const { data, isPending, isLoading } = useQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: () => fetcher("/store/categories"),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isPending && data && Array.isArray(data)) {
      dispatch(setCategories(data || []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isPending || isLoading || !data) {
    return <Loader />;
  }

  return <Fragment>{children}</Fragment>;
}
