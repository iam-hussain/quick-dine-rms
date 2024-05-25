"use client";

import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Loader from "@/components/molecules/loader";
import fetcher from "@/lib/fetcher";
import { setProducts } from "@/store/baseSlice";
import { ProductAPIType } from "@/types";

export default function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const { data, isPending, isLoading } = useQuery<ProductAPIType[]>({
    queryKey: ["products"],
    queryFn: () => fetcher("/store/products"),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isPending && data && Array.isArray(data)) {
      dispatch(setProducts(data || []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isPending || isLoading || !data) {
    return <Loader />;
  }

  return <Fragment>{children}</Fragment>;
}
