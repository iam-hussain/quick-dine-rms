import React from "react";
import clsx from "clsx";
import { ItemType } from "@/types";
import Icon from "../atoms/icon";
import { Button } from "../atoms/button";
import { Separator } from "../atoms/separator";

const animateVariation = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.9 },
};

export interface OrderItemProps {
  item: ItemType;
  onClick?: (data: string, type: "ACCEPT" | "COMPLETE" | "REJECT") => void;
}

function OrderItem({ item, onClick }: OrderItemProps) {
  const isPlaced =
    Boolean(item.placedAt) && !item.acceptedAt && !item.completedAt;
  const isAccepted = item.acceptedAt && !item.completedAt;
  const isCompleted = item.completedAt;

  return (
    <div
      className={clsx(
        "flex flex-col h-auto w-auto justify-center align-middle items-center"
      )}
    >
      <div
        className={clsx(
          "flex w-full justify-between align-middle items-center text-left px-2 gap-4"
        )}
      >
        <div
          className={
            "text-base font-normal text-foreground flex w-full justify-start items-center align-middle gap-6"
          }
        >
          <p className="text-base font-medium">{item.quantity}</p>
          <p className="text-sm font-medium">{item?.title || ""}</p>
        </div>
        {(isPlaced || isAccepted) && (
          <Button
            variant={"transparent"}
            className="p-0 text-red-500"
            onClick={() => onClick && onClick(item.id, "REJECT")}
          >
            <Icon name="MdDeleteOutline" className="w-6 h-6" />
          </Button>
        )}

        {isPlaced && (
          <Button
            variant={"transparent"}
            className="p-0 text-yellow-500"
            onClick={() => onClick && onClick(item.id, "ACCEPT")}
          >
            <Icon name="MdPending" className="w-8 h-8" />
          </Button>
        )}

        {isAccepted && (
          <Button
            variant={"transparent"}
            className="p-0 text-blue-600"
            onClick={() => onClick && onClick(item.id, "COMPLETE")}
          >
            <Icon name="PiCookingPotFill" className="w-8 h-8" />
          </Button>
        )}

        {isCompleted && (
          <Icon
            name="IoCheckmarkDoneCircle"
            className="w-9 h-9 text-green-600"
          />
        )}

        {/* <p className="text-xs font-medium text-primary">
          Order ID: {item?.orderShortId || item.orderId}
        </p> */}
      </div>
      <Separator className="" />
    </div>
  );
}

export default OrderItem;
