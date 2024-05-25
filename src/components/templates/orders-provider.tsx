"use client";

import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Loader from "@/components/molecules/loader";
import fetcher from "@/lib/fetcher";
import { setOrders } from "@/store/baseSlice";
import { OrderAPIType } from "@/types";

export default function OrdersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const { data, isPending, isLoading } = useQuery<OrderAPIType[]>({
    queryKey: ["orders"],
    queryFn: () => fetcher(`/store/orders/open`),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isPending && data && Array.isArray(data)) {
      dispatch(setOrders(data || []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isPending || isLoading || !data) {
    return <Loader />;
  }

  return <Fragment>{children}</Fragment>;
}
