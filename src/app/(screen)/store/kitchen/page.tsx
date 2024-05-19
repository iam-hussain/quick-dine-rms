"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/atoms/resizable";
import { Separator } from "@/components/atoms/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import Loader from "@/components/molecules/loader";
import OrderItem from "@/components/molecules/order-item";
import { ITEM_STATUS, OrderItem as OrderItemType, OrderType } from "@/types";
import fetcher from "@/lib/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
import { toast } from "sonner";

export default function Kitchen() {
  const { data, isPending, isLoading, refetch } = useQuery({
    queryKey: ["orders-kot"],
    queryFn: () => fetcher("/store/orders/kot"),
  });

  const updateItem = useMutation({
    mutationFn: ({ id, ...variables }) =>
      fetcher.post(`/store/order/item/${id}`, variables),
    onSuccess: async (order: any, variables: any) => {
      console.log({ variables });
      refetch();
      toast.success(
        `A new order with ID ${order.shortId} has been created! 🌟`
      );
    },
    onError: (error, variables: any) => {
      console.error(error);
      toast.success(
        "Failed to create order. Please verify the provided details and attempt again. If the problem persists, reach out to support for additional help."
      );
    },
  });

  const itemOnClickHandler = async (
    data: OrderItemType & {
      orderShortId?: string;
    }
  ) => {
    console.log({ data });
    const { id, orderId, status } = data;
    const updateData: any = {
      id,
      orderId,
      status: ITEM_STATUS.PLACED,
    };

    if (status === ITEM_STATUS.PLACED) {
      updateData.status = ITEM_STATUS.ACCEPTED;
      updateData.acceptedAt = new Date();
    }

    if (status === ITEM_STATUS.ACCEPTED) {
      updateData.status = ITEM_STATUS.PREPARED;
      updateData.preparedAt = new Date();
    }

    await updateItem.mutateAsync(updateData);
  };

  if (isPending || isLoading) {
    return <Loader />;
  }

  const { items = {}, orders = [] } = data;
  const { placed = [], accepted = [], prepared = [] } = items;

  return (
    <div className="flex flex-col w-full h-full justify-center align-middle items-center bg-paper p-4">
      <Tabs
        defaultValue="progress"
        className={clsx("flex gap-4 flex-col w-full h-full p-4")}
      >
        <TabsList className="flex justify-between align-middle w-full gap-x-h ">
          <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
          <div className="flex gap-4">
            <TabsTrigger
              className="min-w-[100px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              value="draft"
            >
              Draft
            </TabsTrigger>
            <TabsTrigger
              className="min-w-[100px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              value="progress"
            >
              InProgress
            </TabsTrigger>
            <TabsTrigger
              className="min-w-[100px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              value="completed"
            >
              Completed
            </TabsTrigger>
          </div>
          {/* <Separator className="bg-paper h-1 my-0 col-span-3" /> */}
        </TabsList>
        <div className="p-4 bg-background h-full">
          <TabsContent value="draft"></TabsContent>
          <TabsContent
            value="progress"
            className="grid grid-flow-col auto-cols-max justify-start align-top items-start gap-4"
          >
            {orders.map((order: OrderType) => (
              <div
                key={order.id}
                className="h-full w-auto min-w-[300px] overflow-auto border rounded-md"
              >
                <div className="p-4 border flex">
                  <div>
                    <p className="text-base font-medium ">
                      Order: #{order.shortId}
                    </p>
                    <p className="text-foreground/80">10:22</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {order.items.map(
                    (
                      item: OrderItemType & {
                        orderShortId?: string | undefined;
                      },
                      index: number
                    ) => (
                      <OrderItem
                        item={item}
                        key={index}
                        onClick={itemOnClickHandler}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="completed"></TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
