"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import Loader from "@/components/molecules/loader";
import { OrderAPIType, SortTokensResult } from "@/types";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Button } from "../atoms/button";
import { dateTimeFormat } from "@/lib/date-time";
import OrderStatusIcon from "../molecules/order-status-icon";
import OrderTypeIcon from "../molecules/order-type-icon";

export default function OrderCollection({
  onItemClick,
}: {
  onItemClick?: (shortId: string) => void;
}) {
  const {
    data: orders,
    isPending,
    isLoading,
    refetch,
  } = useQuery<OrderAPIType[]>({
    queryKey: ["tokens"],
    queryFn: () => fetcher(`/store/orders/open`),
  });

  if (isPending || isLoading || !orders || !Array.isArray(orders)) {
    return <Loader />;
  }

  const onItemClickHandler = (shortId: string) => {
    if (onItemClick) {
      onItemClick(shortId);
    }
  };

  if (orders.length === 0) {
    return (
      <p className="text-sm text-foreground/80 text-center w-full py-8 m-auto grow grid-cols-12">
        {"No orders found"}
      </p>
    );
  }

  return (
    <div className="flex align-top items-start justify-center p-6 rounded-lg gap-4 flex-wrap w-full">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border-2 border-foreground/40 rounded-lg h-auto p-4 flex flex-col justify-between align-middle items-center w-full gap-4 max-w-[400px]"
        >
          <div className="flex flex-col justify-start align-middle items-center gap-4">
            <h3 className="text-xl font-medium">#{order.shortId}</h3>
            <div className="flex gap-2 flex-wrap justify-end align-middle items-end">
              <OrderStatusIcon
                value={order.status}
                classNames="text-foreground/90"
                withLabel={true}
              />
              {order?.type && (
                <OrderTypeIcon
                  value={order.type}
                  classNames="text-foreground/90"
                  withLabel={true}
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-foreground/90 font-medium text-base w-full text-right">
              <span className="text-foreground/80 text-sm">Created @ </span>{" "}
              {dateTimeFormat(order?.createdAt || "")}
            </p>
            <p className="text-foreground/90 font-medium text-base w-full text-right">
              <span className="text-foreground/80 text-sm">Updated @ </span>{" "}
              {dateTimeFormat(order?.updatedAt || "")}
            </p>
          </div>

          <div className="flex gap-2 text-sm font-medium text-foreground/80">
            <p>Valid Items: {order.items.validCount}</p>
            <p>Scheduled Items: {order.items.scheduled.length}</p>
            <p>Dispatched Items: {order.items.placed.length}</p>
            <p>Cooking Items: {order.items.accepted.length}</p>
            <p>Rejected Items: {order.items.rejected.length}</p>
          </div>
          <div className="flex h-full w-full">
            <Button
              variant={"secondary"}
              onClick={() => onItemClickHandler(order.shortId)}
              className="h-full w-full"
            >
              Open
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
