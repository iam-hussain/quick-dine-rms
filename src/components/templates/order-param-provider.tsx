"use client";

import { useSearchParams } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useOrderQuery from "@/hooks/useOrderQuery";
import { RootState } from "@/store";

export default function OrderParamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const order = useSelector((state: RootState) => state.base.order);
  const { fetchOnLoad } = useOrderQuery();
  const [onLoad, setOnLoad] = useState(true);

  useEffect(() => {
    if (!order && orderId && onLoad) {
      setOnLoad(false);
      fetchOnLoad(orderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return <Fragment>{children}</Fragment>;
}
