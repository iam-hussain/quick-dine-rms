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
    <div className="grid grid-cols-2 align-top items-start m-0 justify-start p-6 rounded-lg gap-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-paper w-full h-auto p-4 flex justify-between align-middle items-center"
        >
          <div className="flex grow flex-col gap-2 text-base">
            <p className="font-medium text-base text-foreground/70">
              Order ID:{" "}
              <span className="text-foreground/90">#{order.shortId}</span>
            </p>
            <p>Status: {order.status}</p>
            <p>Type: {order.type}</p>
            <p>
              Created: {dateTimeFormat(order.createdAt)} / Updated:{" "}
              {dateTimeFormat(order.updatedAt || "")}
            </p>
            <div className="flex gap-2 text-sm font-medium text-foreground/80">
              <p>Valid Items: {order.items.validCount}</p>
              <p>Scheduled Items: {order.items.scheduled.length}</p>
              <p>Dispatched Items: {order.items.placed.length}</p>
              <p>Cooking Items: {order.items.accepted.length}</p>
              <p>Rejected Items: {order.items.rejected.length}</p>
            </div>
          </div>
          <div className="flex h-full">
            <Button
              variant={"secondary"}
              onClick={() => onItemClickHandler(order.shortId)}
              className="h-full"
            >
              Open
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
