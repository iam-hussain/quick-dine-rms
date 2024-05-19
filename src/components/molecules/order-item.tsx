import React from "react";
import clsx from "clsx";
import { OrderItem as OrderItemType } from "@/types";
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
  return (
    <div
      className={clsx(
        "flex flex-row h-auto w-auto justify-center align-middle items-center"
      )}
    >
      <div className={clsx("flex-col bg-paper w-full text-left", {})}>
        <div
          className={
            "text-base font-semibold text-foreground flex w-full justify-between gap-6"
          }
        >
          <p className="text-base">{item.quantity}</p>
          <p className="grow">{item?.title || ""}</p>
        </div>

        {/* <p className="text-xs font-medium text-primary">
          Order ID: {item?.orderShortId || item.orderId}
        </p> */}
      </div>
    </div>
  );
}

export default OrderItem;
