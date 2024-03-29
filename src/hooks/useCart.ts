import { useEffect, useMemo } from "react";
import { useStoreStore } from "@/stores/storeSlice";
import { Control, useWatch } from "react-hook-form";
import { CartFormType, StoreAdditionalType } from "@/types";
import { getChargesValue } from "@/lib/utils";
import { OrderType } from "@/validations";

type UseCartType = {
  control: Control<CartFormType, any, CartFormType>;
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
    defaultValue: OrderType.PICK_UP,
  });

  const shouldAddPackingCharge = [
    OrderType.DELIVERY,
    OrderType.PLATFORM,
    OrderType.TAKE_AWAY,
  ].includes(type);

  const shouldAddDeliveryCharge = type === OrderType.DELIVERY;

  const subTotal = useMemo(() => {
    if (!items.length) {
      return 0;
    }
    return items.map((e) => e.quantity * e.price).reduce((a, b) => a + b);
  }, [items]);

  const packagingCharge = useMemo(() => {
    if (!shouldAddPackingCharge && PACKING) {
      return 0;
    }
    console.log({ PACKING });
    return 10;
    // return getChargesValue(PACKING.type, PACKING.rate, subTotal, items.length);
  }, [shouldAddPackingCharge, PACKING]);

  const deliveryCharge = 0;

  // useMemo(() => {
  //   if (!shouldAddDeliveryCharge) {
  //     return 0;
  //   }
  //   return getChargesValue(
  //     DELIVERY.type,
  //     DELIVERY.rate,
  //     subTotal,
  //     items.length
  //   );
  // }, [
  //   shouldAddDeliveryCharge,
  //   DELIVERY.type,
  //   DELIVERY.rate,
  //   subTotal,
  //   items.length,
  // ]);

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
      amount: getChargesValue(e.type, e.rate, subTotal, items.length),
    }));
  }, [taxes, subTotal, items.length]);

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
  };
}
export default useCart;
