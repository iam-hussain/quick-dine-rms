import { useEffect, useMemo } from "react";
import { useStoreStore } from "@/stores/storeSlice";
import { Control, useWatch, useFieldArray } from "react-hook-form";
import { StoreAdditionalType } from "@/types";
import { getChargesValue } from "@/lib/utils";
import { CartSchemaValues, ORDER_TYPE } from "@/validations";

type UseCartType = {
  control: Control<CartSchemaValues, any, CartSchemaValues>;
};

function useCart({ control }: UseCartType) {
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

  const items = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

  const type = useWatch({
    control,
    name: "type",
    defaultValue: ORDER_TYPE.PICK_UP as any,
  });

  const fees = useWatch({
    control,
    name: "fees",
    defaultValue: [],
  });

  const deliveryIndex = useMemo(
    () => fees.findIndex((e) => e.key === "DELIVERY"),
    [fees]
  );
  const packagingIndex = useMemo(
    () => fees.findIndex((e) => e.key === "PACKING"),
    [fees]
  );

  useEffect(() => {
    if (
      type &&
      [ORDER_TYPE.DELIVERY, ORDER_TYPE.PLATFORM, ORDER_TYPE.TAKE_AWAY].includes(
        type
      )
    ) {
      if (packagingIndex < 0) {
        append(PACKING);
      }
    } else if (packagingIndex >= 0) {
      remove(packagingIndex);
    }

    if (type && type === ORDER_TYPE.DELIVERY) {
      if (deliveryIndex < 0) {
        append(DELIVERY);
      }
    } else if (deliveryIndex >= 0) {
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
    [ORDER_TYPE.DELIVERY, ORDER_TYPE.PLATFORM, ORDER_TYPE.TAKE_AWAY].includes(
      type
    );

  const shouldAddDeliveryCharge = type === ORDER_TYPE.DELIVERY;

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
    const packing = fees[packagingIndex];
    if (packagingIndex >= 0 || !packing) {
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
    const delivery = fees[deliveryIndex];
    if (deliveryIndex || !delivery) {
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
    items,
    total,
    taxesValue,
    grandTotal,
    totalItems,
  };
}
export default useCart;
