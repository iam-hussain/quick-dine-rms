import { useMemo } from "react";
import { useStoreStore } from "@/stores/storeSlice";
import { Control, useWatch } from "react-hook-form";
import { CartFormType, StoreAdditionalType } from "@/types";
import { getChargesValue } from "@/lib/utils";
import { OrderType } from "@/validations";

type UseCartType = {
  control: Control<CartFormType, any, CartFormType>;
};

function useCart({ control }: UseCartType) {
  const { tax, delivery, packing } = useStoreStore(
    (state: { additional: StoreAdditionalType }) => state.additional
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
    if (!shouldAddPackingCharge) {
      return 0;
    }
    return getChargesValue(packing.type, packing.value, subTotal, items.length);
  }, [
    subTotal,
    items.length,
    packing.type,
    packing.value,
    shouldAddPackingCharge,
  ]);

  const deliveryCharge = useMemo(() => {
    if (!shouldAddDeliveryCharge) {
      return 0;
    }
    return getChargesValue(
      delivery.type,
      delivery.value,
      subTotal,
      items.length
    );
  }, [
    shouldAddDeliveryCharge,
    delivery.type,
    delivery.value,
    subTotal,
    items.length,
  ]);

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

  const chargesValue = useMemo(() => {
    return tax.map((e) => ({
      ...e,
      amount: getChargesValue(e.type, e.value, subTotal, items.length),
    }));
  }, [tax, subTotal, items.length]);

  const grandTotal = useMemo(() => {
    return total + chargesValue.reduce((a, b) => a + b.amount, 0);
  }, [total, chargesValue]);

  return {
    shouldAddPackingCharge,
    shouldAddDeliveryCharge,
    subTotal,
    deliveryCharge,
    packagingCharge,
    type,
    items,
    total,
    chargesValue,
    grandTotal,
  };
}
export default useCart;
