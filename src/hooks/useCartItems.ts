import { useContext, useEffect, useMemo } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { ORDER_TYPE, OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { OrderContext } from "@/components/providers/order-provider";

function useCartItems() {
  const { order } = useContext(OrderContext);
  const { watch } = useFormContext<OrderUpsertSchemaType>();

  const cartItems = watch("items", []);

  return {
    cart: cartItems || [],
    all: order?.items || [],
    drafted: order?.drafted || [],
    scheduled: order?.scheduled || [],
    placed: order?.placed || [],
    accepted: order?.accepted || [],
    prepared: order?.prepared || [],
    summary: order?.summary || [],
  };
}
export default useCartItems;
