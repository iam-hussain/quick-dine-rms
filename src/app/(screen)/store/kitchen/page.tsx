"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs-primary";
import Loader from "@/components/molecules/loader";
import { SortTokensResult } from "@/types";
import fetcher from "@/lib/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { toast } from "sonner";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/atoms/scroll-area";
import TokenCollection from "@/components/organisms/token-collection";

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
    mutationFn: ({ id, shortId, ...variables }) =>
      fetcher.post(`/store/order/item/${id}`, variables),
    onSuccess: async (order: any, variables: any) => {
      refetch();
      toast.success(
        `Item of the Token ID ${variables.shortId} has been successfully updated! 🚀`
      );
    },
    onError: (error, variables: any) => {
      console.error(error);
      toast.success(
        `Unable to update item of the token ID ${variables.shortId}. Please review the entered information and try again. If the issue persists, contact support for further assistance`
      );
    },
  });

  const updateToken = useMutation({
    mutationFn: ({ id, shortId, ...variables }) =>
      fetcher.patch(`/store/token/${id}`, variables),
    onSuccess: async (_: any, variables: any) => {
      refetch();
      toast.success(
        `Token ID ${variables.shortId.split("-")[1]} of the order ID ${variables.shortId} has been successfully updated! 🚀`
      );
    },
    onError: (error, variables) => {
      console.error(error);
      toast.success(
        `Unable to update token with ID ${variables.shortId.split("-")[1]} of the order ID ${variables.orderId}. Please review the entered information and try again. If the issue persists, contact support for further assistance`
      );
    },
  });

  const tokenOnCompleteClickHandler = async ({
    id,
    shortId,
    orderId,
  }: {
    id: string;
    shortId: string;
    orderId?: string | null;
  }) => {
    if (!orderId) {
      return true;
    }
    await updateToken.mutateAsync({
      id,
      shortId,
      completedAt: new Date().toISOString(),
      orderId,
    });
  };

  const tokenOnDispatchClickHandler = async ({
    id,
    shortId,
    orderId,
  }: {
    id: string;
    shortId: string;
    orderId?: string | null;
  }) => {
    if (!orderId) {
      return true;
    }
    await updateToken.mutateAsync({
      id,
      shortId,
      placedAt: new Date().toISOString(),
      orderId,
    });
  };

  const itemOnClickHandler = async ({
    id,
    shortId,
    mode,
    orderId,
  }: {
    id: string;
    shortId: string;
    orderId?: string | null;
    mode: "ACCEPT" | "COMPLETE" | "REJECT";
  }) => {
    if (!orderId) {
      return true;
    }
    if (mode === "ACCEPT") {
      await updateItem.mutateAsync({
        id,
        orderId,
        shortId,
        acceptedAt: new Date(),
      });
    }

    if (mode === "COMPLETE") {
      await updateItem.mutateAsync({
        id,
        orderId,
        shortId,
        completedAt: new Date(),
      });
    }

    if (mode === "REJECT") {
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
    <div className="flex flex-col w-full h-full justify-center align-middle items-center bg-paper py-4 px-6">
      <Tabs
        defaultValue="progress"
        className={clsx("flex gap-4 flex-col w-full h-full")}
      >
        <TabsList className="flex justify-between align-middle w-full gap-x-h ">
          <h1 className="text-2xl font-semibold text-foreground">
            Kitchen Tokens Display
          </h1>
          <div className="flex gap-4">
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="progress">InProgress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </div>
        </TabsList>
        <div className="p-6 bg-background flex grow h-4/6 ">
          <ScrollArea className={clsx("w-full h-full pr-4")}>
            <TabsContent value="scheduled">
              <TokenCollection
                tokens={tokens.scheduled}
                variant="scheduled"
                onDispatchClick={tokenOnDispatchClickHandler}
              />
            </TabsContent>
            <TabsContent value="progress">
              <TokenCollection
                tokens={tokens.placed}
                variant="placed"
                onItemClick={itemOnClickHandler}
                onCompleteClick={tokenOnCompleteClickHandler}
              />
            </TabsContent>
            <TabsContent value="completed">
              <TokenCollection
                tokens={tokens.completed}
                variant="completed"
                noItemMessage={
                  "No items found (You will see only completed token in last 5 hours)"
                }
              />
            </TabsContent>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
