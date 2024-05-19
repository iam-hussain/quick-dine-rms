import React from "react";
import clsx from "clsx";
import { OrderItem as OrderItemType } from "@/types";
import Icon from "../atoms/icon";
import { Button } from "../atoms/button";

const animateVariation = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.9 },
};

export interface OrderItemProps {
  item: OrderItemType & {
    orderShortId?: string;
  };
  onClick?: (
    data: OrderItemType & {
      orderShortId?: string;
    }
  ) => void;
}

function OrderItem({ item, onClick }: OrderItemProps) {
  return (
    <div
      className={clsx(
        "flex flex-row h-auto w-auto justify-center align-middle items-center"
      )}
    >
      <div
        className={clsx(
          "flex w-full justify-between align-middle items-center text-left px-2",
          {}
        )}
      >
        <div
          className={
            "text-base font-normal text-foreground flex w-full justify-start items-center align-middle gap-6"
          }
        >
          <p className="text-base font-medium">{item.quantity} X</p>
          <p className="text-sm">{item?.title || ""}</p>
        </div>
        <Button
          variant={"shine"}
          className="p-2"
          onClick={() => onClick && onClick(item)}
        >
          {item.status === "PLACED" && (
            <Icon name="MdPending" className="w-6 h-6" />
          )}
          {item.status === "ACCEPTED" && (
            <Icon name="PiCookingPotFill" className="w-6 h-6" />
          )}
          {item.status === "PREPARED" && (
            <Icon name="IoCheckmarkDoneCircle" className="w-6 h-6" />
          )}
        </Button>
        {/* <p className="text-xs font-medium text-primary">
          Order ID: {item?.orderShortId || item.orderId}
        </p> */}
        {/* <Separator className="h-1 bg-paper/50" /> */}
      </div>
    </div>
  );
}

export default OrderItem;
