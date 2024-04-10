import { useEffect, useMemo } from "react";
import { useStoreStore } from "@/stores/storeSlice";
import { Control, useWatch, useFieldArray } from "react-hook-form";
import { StoreAdditionalType } from "@/types";
import { getChargesValue } from "@/lib/utils";
import { CartSchemaValues } from "@/validations";
import {
  ORDER_STATUS,
  ORDER_TYPE,
  OrderUpsertSchemaType,
} from "@iam-hussain/qd-copilot";

type UseCartType = {
  order: any;
  control: Control<OrderUpsertSchemaType, any, OrderUpsertSchemaType>;
};

function useCart({ control, order }: UseCartType) {
  const {
    taxes,
    fees: { DELIVERY, PACKING },
  } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );

  const { remove, append } = useFieldArray({
    control,
    name: "fees",
  });

  const currentItems = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

  const type = useWatch({
    control,
    name: "type",
    defaultValue: ORDER_TYPE.Values.PICK_UP as any,
  });

  const fees = useWatch({
    control,
    name: "fees",
    defaultValue: [],
  });

  const items = useMemo(
    () => [...(order?.items || []), ...currentItems],
    [currentItems, order?.items]
  );

  const deliveryIndex = useMemo(
    () => fees && fees.findIndex((e) => e.key === "DELIVERY"),
    [fees]
  );
  const packagingIndex = useMemo(
    () => fees && fees.findIndex((e) => e.key === "PACKING"),
    [fees]
  );

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

  const shouldAddPackingCharge =
    type &&
    [
      ORDER_TYPE.Values.DELIVERY,
      ORDER_TYPE.Values.PLATFORM,
      ORDER_TYPE.Values.TAKE_AWAY,
    ].includes(type as any);

  const shouldAddDeliveryCharge = type === ORDER_TYPE.Values.DELIVERY;

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
    shouldAddPackingCharge,
    shouldAddDeliveryCharge,
    subTotal,
    deliveryCharge,
    packagingCharge,
    type,
    orderedItems: (order?.items || []) as any[],
    allItems: items,
    items: currentItems,
    total,
    taxesValue,
    grandTotal,
    totalItems,
  };
}
export default useCart;
