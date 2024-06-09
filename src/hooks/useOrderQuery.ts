import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useRouter, useSearchParams } from "@tanstack/react-router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import fetcher from "@/lib/fetcher";
import { RootState } from "@/store";
import { setOrder } from "@/store/baseSlice";

function useOrderQuery() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { reset } = useFormContext<OrderUpsertSchemaType>();
  const { enableTables, enableCustomerAdding, enableKitchenCategory } =
    useSelector((state: RootState) => state.base.featureFlags);

  const upsertOrderMutation = useMutation({
    mutationFn: (variables) => fetcher.post("/store/order", variables),
    onSuccess: async (order: any, variables: OrderUpsertSchemaType) => {
      if (variables.shortId) {
        toast.success(
          `Order ID ${order.shortId} has been successfully updated! 🚀`
        );
      } else {
        if (!orderId || orderId !== variables.shortId) {
          router.history.push(`/store/pos?orderId=${order.shortId}`);
          queryClient.invalidateQueries({
            queryKey: ["recent_orders"],
          });
        }

        toast.success(
          `A new order with ID ${order.shortId} has been created! 🌟`
        );
      }
      const { shortId, items, table = {}, status } = order || {};
      dispatch(setOrder(order));
      reset({
        type: order?.type || "TAKE_AWAY",
        items: items?.drafted || [],
        fees: order?.fees || [],
        taxes: order?.taxes || [],
        ...(table.key ? { table } : {}),
        ...(shortId ? { shortId } : {}),
        ...(status ? { status } : {}),
      });
    },
    onError: (error, variables: OrderUpsertSchemaType) => {
      console.error(error);
      if (variables.shortId) {
        toast.success(
          `Unable to update order with ID ${variables.shortId}. Please review the entered information and try again. If the issue persists, contact support for further assistance`
        );
      } else {
        toast.success(
          "Failed to create order. Please verify the provided details and attempt again. If the problem persists, reach out to support for additional help."
        );
      }
    },
  });

  const fetchOrderMutation = useMutation({
    mutationFn: ({ shortId }: any) => fetcher(`/store/order/${shortId}`),
    onSuccess: async (order: any, variables: any) => {
      const { shortId, items, table = {}, status } = order || {};
      if (!orderId || orderId !== variables.shortId) {
        router.history.push(`/store/pos?orderId=${order.shortId}`);
        queryClient.invalidateQueries({
          queryKey: ["recent_orders"],
        });
      }

      dispatch(setOrder(order));
      reset({
        type: order?.type || "TAKE_AWAY",
        items: items?.drafted || [],
        fees: order?.fees || [],
        taxes: order?.taxes || [],
        ...(table.key ? { table } : {}),
        ...(shortId ? { shortId } : {}),
        ...(status ? { status } : {}),
      });
    },
  });

  const refreshOrderMutation = useMutation({
    mutationFn: ({ shortId }: any) => fetcher(`/store/order/${shortId}`),
    onSuccess: async (order: any) => {
      dispatch(setOrder(order));
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const upsert = useCallback(
    _.throttle(({ table, ...variables }: OrderUpsertSchemaType) => {
      // const { fees, shortId, type, status } = order || {};
      return upsertOrderMutation.mutateAsync({
        // ...(shortId ? { shortId } : {}),
        // ...(type ? { type } : {}),
        // ...(status ? { status } : {}),
        // ...(fees ? { fees } : {}),
        // // ...(enableTables && order?.table?.key ? { table: order?.table } : {}),
        ...variables,
        ...(enableTables && table?.key ? { table } : {}),
        ...(enableCustomerAdding ? {} : {}),
        enableKitchenCategory,
      });
    }, 2000),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetch = useCallback(
    _.throttle((shortId: string) => {
      return fetchOrderMutation.mutateAsync({ shortId });
    }, 1000),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOnLoad = useCallback(
    _.throttle((shortId: string) => {
      return fetchOrderMutation.mutateAsync({ shortId });
    }, 10000),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh = useCallback(
    _.throttle((shortId: string) => {
      return refreshOrderMutation.mutateAsync({ shortId });
    }, 3000),
    []
  );

  return { upsert, refresh, fetch, fetchOnLoad };
}
export default useOrderQuery;
