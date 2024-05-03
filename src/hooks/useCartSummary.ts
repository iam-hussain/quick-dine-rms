import { useMemo } from "react";
import { useStoreStore } from "@/store/storeSlice";
import { useFormContext } from "react-hook-form";
import { OrderItem, StoreAdditionalType } from "@/types";
import { getChargesValue } from "@/lib/utils";
import { ORDER_TYPE, OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";

function useCartSummary({ items }: { items: OrderItem[] }) {
  const { watch } = useFormContext<OrderUpsertSchemaType>();
  const { taxes } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );

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

  const subTotal = useMemo(() => {
    if (!items.length) {
      return 0;
    }
    return items.map((e) => e.quantity * e.price).reduce((a, b) => a + b, 0);
  }, [items]);

  const totalItems = useMemo(() => {
    if (!items.length) {
      return 0;
    }
    return items.map((e) => e.quantity).reduce((a, b) => a + b, 0);
  }, [items]);

  const packagingCharge = useMemo(() => {
    const packing = fees && packagingIndex && fees[packagingIndex];
    if ((packagingIndex && packagingIndex < 0) || !packing) {
      return 0;
    }
    return getChargesValue(
      packing?.type || "VALUE",
      packing?.rate || 0,
      subTotal,
      totalItems
    );
  }, [packagingIndex, fees, subTotal, totalItems]);

  const deliveryCharge = useMemo(() => {
    const delivery = fees && deliveryIndex && fees[deliveryIndex];
    if ((deliveryIndex && deliveryIndex < 0) || !delivery) {
      return 0;
    }
    return getChargesValue(
      delivery.type || "VALUE",
      delivery.rate,
      subTotal,
      totalItems
    );
  }, [deliveryIndex, fees, subTotal, totalItems]);

  const total = useMemo(() => {
    return subTotal + packagingCharge + deliveryCharge;
  }, [deliveryCharge, packagingCharge, subTotal]);

  const taxesValue = useMemo(() => {
    return taxes.map((e) => ({
      ...e,
      amount: getChargesValue(e.type, e.rate, subTotal, totalItems),
    }));
  }, [taxes, subTotal, totalItems]);

  const grandTotal = useMemo(() => {
    return total + taxesValue.reduce((a, b) => a + b.amount, 0);
  }, [total, taxesValue]);

  return {
    subTotal,
    deliveryCharge,
    packagingCharge,
    type,
    items,
    total,
    taxesValue,
    grandTotal,
    totalItems,
  };
}
export default useCartSummary;
