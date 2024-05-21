"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import Loader from "@/components/molecules/loader";
import OrderItem from "@/components/molecules/order-item";
import { SortTokensResult } from "@/types";
import fetcher from "@/lib/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { toast } from "sonner";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/atoms/button";

export default function Kitchen() {
  const { enableKitchenCategory } = useSelector(
    (state: RootState) => state.base.featureFlags
  );
  const {
    data: tokens,
    isPending,
    isLoading,
    refetch,
  } = useQuery<SortTokensResult>({
    queryKey: ["tokens"],
    queryFn: () =>
      fetcher(
        `/store/tokens?category=${enableKitchenCategory ? "true" : "false"}`
      ),
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

  const updateToken = useMutation({
    mutationFn: ({ id, shortId, ...variables }) =>
      fetcher.patch(`/store/token/${id}`, variables),
    onSuccess: async (_: any, variables: any) => {
      refetch();
      toast.success(
        `A new order with ID ${variables.shortId} has been created! 🌟`
      );
    },
    onError: (error) => {
      console.error(error);
      toast.success(
        "Failed to create order. Please verify the provided details and attempt again. If the problem persists, reach out to support for additional help."
      );
    },
  });

  const tokenCompleteHandler = async (
    id: string,
    shortId: string,
    orderId: string,
    isValid: boolean
  ) => {
    if (isValid || !orderId) {
      return true;
    }
    await updateToken.mutateAsync({
      id,
      shortId,
      completedAt: new Date(),
      orderId,
    });
  };

  const itemOnClickHandler = async (
    id: string,
    type: "ACCEPT" | "COMPLETE" | "REJECT",
    orderId?: string | null
  ) => {
    if (!orderId) {
      return true;
    }
    if (type === "ACCEPT") {
      await updateItem.mutateAsync({ id, orderId, acceptedAt: new Date() });
    }

    if (type === "COMPLETE") {
      await updateItem.mutateAsync({ id, orderId, completedAt: new Date() });
    }

    if (type === "REJECT") {
      await updateItem.mutateAsync({
        id,
        orderId,
        rejectedAt: new Date(),
        rejected: true,
      });
    }
  };

  if (isPending || isLoading || !tokens) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full h-full justify-center align-middle items-center bg-paper p-4">
      <Tabs
        defaultValue="progress"
        className={clsx("flex gap-4 flex-col w-full h-full p-4")}
      >
        <TabsList className="flex justify-between align-middle w-full gap-x-h ">
          <h1 className="text-2xl font-semibold text-foreground">
            Kitchen Tokens Display
          </h1>
          <div className="flex gap-4">
            <TabsTrigger
              className="min-w-[100px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              value="scheduled"
            >
              Scheduled
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
        <div className="p-6 bg-background h-full">
          <TabsContent value="draft"></TabsContent>
          <TabsContent
            value="progress"
            className={clsx(
              "flex flex-wrap align-top items-start gap-4 m-0 justify-center"
            )}
          >
            {tokens.placed.length === 0 && (
              <p className="text-sm text-foreground/80 text-center w-full py-8 m-auto grow grid-cols-12">
                No items found
              </p>
            )}
            {tokens.placed.map((token) => (
              <div
                key={token.id}
                className="h-auto w-auto min-w-[300px] bg-paper/40 overflow-auto rounded-md p-4 border-2 border-foreground/70"
              >
                <div className="pb-1 border-b border-foreground/50 flex">
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between w-full gap-2">
                      <p className="text-lg font-medium ">#{token.displayId}</p>
                      <div className="flex flex-col justify-center align-middle items-end">
                        <p className="font-medium text-sm text-foreground/70">
                          Order:{" "}
                          <span className="text-foreground/90">
                            #{token.order.shortId}
                          </span>
                        </p>
                        {token.kitchenCategory?.name && (
                          <p className="text-foreground/90 font-medium text-base">
                            {token.kitchenCategory?.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {token.items.valid.map((item) => (
                    <OrderItem
                      item={item}
                      key={item.id}
                      onClick={(id, type) =>
                        itemOnClickHandler(id, type, token.orderId)
                      }
                    />
                  ))}
                  {Boolean(token.items.rejected.length) && (
                    <div className="text-sm text-foreground/60 p-2 pt-4 flex gap-1 flex-col">
                      {token.items.rejected.map((item) => (
                        <div className="flex gap-6" key={item.id}>
                          <p>{item.quantity}</p>
                          <p>{item.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant={
                    token.items.valid.length !== token.items.completed.length
                      ? "accent"
                      : "secondary"
                  }
                  className="w-full my-2"
                  onClick={() =>
                    tokenCompleteHandler(
                      token.id,
                      token.shortId,
                      token.orderId || "",
                      token.items.valid.length !== token.items.completed.length
                    )
                  }
                  disabled={
                    token.items.valid.length !== token.items.completed.length
                  }
                >
                  Completed
                </Button>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="completed">
            {tokens.completed.length === 0 && (
              <p className="text-sm text-foreground/80 text-center w-full py-8 m-auto grow grid-cols-12">
                No items found (You will see only completed token in last 5
                hours)
              </p>
            )}
            {tokens.completed.map((token) => (
              <div
                key={token.id}
                className="h-full w-auto min-w-[300px] overflow-auto border rounded-md p-2"
              >
                <div className="p-4 border flex">
                  <div>
                    <p className="text-base font-medium ">
                      Order: #{token.order.shortId}
                    </p>
                    <p className="text-base font-medium ">
                      Token: #{token.shortId}
                    </p>
                    <p className="text-foreground/80">
                      {token.kitchenCategory?.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {token.items.valid.map((item) => (
                    <OrderItem
                      item={item}
                      key={item.id}
                      onClick={(id) =>
                        itemOnClickHandler(id, "ACCEPT", token.orderId)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
