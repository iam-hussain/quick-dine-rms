import instance from "@/lib/instance";
import { useStoreStore } from "@/stores/storeSlice";
import { OrderType, StoreAdditionalType } from "@/types";
import { ORDER_TYPE, OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";

export type OrderContextType = {
  order: OrderType | null;
  upsert: (data: OrderUpsertSchemaType) => any;
};

export const OrderContextDefault = {
  order: null,
  upsert: () => {},
};

export const OrderContext =
  createContext<OrderContextType>(OrderContextDefault);

OrderContext.displayName = "OrderContext";

export const OrderContextConsumer = OrderContext.Consumer;

export const OrderContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { enableTables, enableCustomerAdding } = useStoreStore(
    (state) => state.featureFlags
  );
  const {
    fees: { DELIVERY, PACKING },
  } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const { setValue, watch, control } = useFormContext<OrderUpsertSchemaType>();

  const fetchOrderMutation = useMutation({
    mutationFn: (variables) =>
      instance.get(`/store/order/${variables.shortId}`),
    onSuccess: async (data: any) => {
      history.pushState({}, "", `/store/pos?id=${data.shortId}`);
      setOrder(data as any);
      setValue("shortId", data.shortId);

      setValue("shortId", data.shortId);
      setValue("type", data.type);
      setValue("status", data.status);
      // setValue("note", e.note);
      // setValue("customerId", e.customerId);
      // setValue("completedAt", e.completedAt);
      // setValue("deliveredAt", e.deliveredAt);
      setValue("fees", data.fees);
      setValue("table", data.table);
      setValue("taxes", data.taxes);
    },
    onError: console.error,
  });

  const upsertOrderMutation = useMutation({
    mutationFn: (variables) => instance.post("/store/order", variables),
    onSuccess: async (data: any, variables: OrderUpsertSchemaType) => {
      setValue("items", []);
      if (variables.shortId) {
        toast.success(
          `Order ID ${data.shortId} has been successfully updated! 🚀`
        );
      } else {
        toast.success(`A new order with ID ${data.id} has been created! 🌟`);
      }
      fetchOrderMutation.mutate({ shortId: data.shortId });
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

  useEffect(() => {
    if (id && !order?.shortId) {
      fetchOrderMutation.mutate({ shortId: id });
    }
  }, [fetchOrderMutation, id, order]);

  const type = watch("type", ORDER_TYPE.Values.TAKE_AWAY as any);
  const fees = watch("fees", []);

  const deliveryIndex = useMemo(
    () => fees && fees.findIndex((e) => e.key === "DELIVERY"),
    [fees]
  );
  const packagingIndex = useMemo(
    () => fees && fees.findIndex((e) => e.key === "PACKING"),
    [fees]
  );

  const { remove, append } = useFieldArray({
    control,
    name: "fees",
  });

  useEffect(() => {
    if (
      type &&
      [
        ORDER_TYPE.Values.DELIVERY,
        ORDER_TYPE.Values.PLATFORM,
        ORDER_TYPE.Values.TAKE_AWAY,
      ].includes(type as any)
    ) {
      if (packagingIndex && packagingIndex < 0) {
        append(PACKING);
      }
    } else if (packagingIndex && packagingIndex >= 0) {
      remove(packagingIndex);
    }

    if (type && type === ORDER_TYPE.Values.DELIVERY) {
      if (deliveryIndex && deliveryIndex < 0) {
        append(DELIVERY);
      }
    } else if (deliveryIndex && deliveryIndex >= 0) {
      remove(deliveryIndex);
    }
  }, [
    DELIVERY,
    PACKING,
    append,
    deliveryIndex,
    fees,
    packagingIndex,
    remove,
    type,
  ]);

  const upsert = ({ table, ...variables }: OrderUpsertSchemaType) => {
    return upsertOrderMutation.mutate({
      ...variables,
      ...(enableTables && table?.key ? { table } : {}),
      ...(enableCustomerAdding ? {} : {}),
    });
  };

  return (
    <OrderContext.Provider value={{ order, upsert }}>
      {children}
    </OrderContext.Provider>
  );
};
