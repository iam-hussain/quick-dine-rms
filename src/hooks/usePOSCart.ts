import fetcher from "@/lib/fetcher";
import { RootState } from "@/store";
import { setUpdateOrder } from "@/store/baseSlice";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import _ from "lodash";
import { useCallback } from "react";

function usePOSCart() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { reset } = useFormContext<OrderUpsertSchemaType>();
  const { enableTables, enableCustomerAdding, enableKitchenCategory } =
    useSelector((state: RootState) => state.base.featureFlags);
  const order = useSelector((state: RootState) => state.base.order);

  const upsertOrderMutation = useMutation({
    mutationFn: (variables) => fetcher.post("/store/order", variables),
    onSuccess: async (order: any, variables: OrderUpsertSchemaType) => {
      if (variables.shortId) {
        toast.success(
          `Order ID ${order.shortId} has been successfully updated! 🚀`
        );
      } else {
        if (!orderId) {
          // router.push(`/store/pos?orderId=${order.shortId}`);
          window.history.replaceState(
            null,
            `Order: #${order.shortId} || POS || Quick Dine`,
            `/store/pos?orderId=${order.shortId}`
          );
        }
        toast.success(
          `A new order with ID ${order.shortId} has been created! 🌟`
        );
      }
      const { shortId, drafted = [], table = {}, status } = order || {};

      dispatch(setUpdateOrder(order));
      reset({
        type: order?.type || "TAKE_AWAY",
        items: drafted,
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

  const refetchOrderMutation = useMutation({
    mutationFn: ({ shortId }: any) => fetcher(`/store/order/${shortId}`),
    onSuccess: async (order: any) => {
      dispatch(setUpdateOrder(order));
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refetch = useCallback(
    _.throttle((shortId: string) => {
      return refetchOrderMutation.mutateAsync({ shortId });
    }, 3000),
    []
  );

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

  return { upsert, refetch };
}
export default usePOSCart;
