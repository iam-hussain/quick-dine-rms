import React from "react";
import clsx from "clsx";
import { OrderItem as OrderItemType } from "@/types";
import { useStoreStore } from "@/store/storeSlice";
import { string } from "zod";

const animateVariation = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.9 },
};

export interface OrderItemProps {
  item: OrderItemType & {
    orderShortId?: string;
  };
}

function OrderItem({ item }: OrderItemProps) {
  const featureFlags = useStoreStore((state) => state.featureFlags);
  return (
    <div
      className={clsx(
        "flex flex-row h-auto w-[320px] justify-center align-middle items-center"
      )}
    >
      <div className={clsx("flex-col bg-paper p-4 w-full border-l-[20px]", {})}>
        <div
          className={
            "text-base font-semibold text-foreground flex w-full justify-between"
          }
        >
          <p>{item?.title || ""}</p>
          <p className="text-base">X {item.quantity}</p>
        </div>

        <p className="text-xs font-medium text-primary">
          Order ID: {item?.orderShortId || item.orderId}
        </p>
      </div>
    </div>
  );
}

export default OrderItem;
