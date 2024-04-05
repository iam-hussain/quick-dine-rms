import { useEffect, useMemo } from "react";
import { useStoreStore } from "@/stores/storeSlice";
import { Control, useWatch } from "react-hook-form";
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
    if (!shouldAddPackingCharge && PACKING) {
      return 0;
    }
    return getChargesValue(PACKING.type, PACKING.rate, subTotal, totalItems);
  }, [shouldAddPackingCharge, PACKING, subTotal, totalItems]);

  const deliveryCharge = useMemo(() => {
    if (!shouldAddDeliveryCharge && DELIVERY) {
      return 0;
    }
    return getChargesValue(DELIVERY.type, DELIVERY.rate, subTotal, totalItems);
  }, [shouldAddDeliveryCharge, DELIVERY, subTotal, totalItems]);

  const total = useMemo(() => {
    let value = subTotal;

    if (shouldAddPackingCharge) {
      value = value + packagingCharge;
    }

    if (shouldAddDeliveryCharge) {
      value = value + deliveryCharge;
    }

    return value;
  }, [
    deliveryCharge,
    packagingCharge,
    shouldAddDeliveryCharge,
    shouldAddPackingCharge,
    subTotal,
  ]);

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
