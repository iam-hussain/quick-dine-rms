"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/atoms/resizable";
import Loader from "@/components/molecules/loader";
import OrderItem from "@/components/molecules/order-item";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";

export default function Kitchen() {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["orders-kot"],
    queryFn: () => fetcher("/store/orders/kot"),
  });

  if (isPending || isLoading) {
    return <Loader />;
  }

  const { items = {}, orders = [] } = data;
  const { placed = [], accepted = [], prepared = [] } = items;

  return (
    <div className="flex w-full h-full bg-background flex-wrap grow gap-4 justify-center align-middle items-center p-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col h-auto w-auto bg-paper min-w-[300px] rounded-xl overflow-auto"
        >
          <div className="p-4 bg-accent flex">
            <div>
              <p>Order: #{order.shortId}</p>
              <p>10:22</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-6">
            {order.items.map((item, index) => (
              <OrderItem item={item} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
