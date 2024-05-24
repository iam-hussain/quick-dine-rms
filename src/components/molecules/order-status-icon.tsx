import { ORDER_STATUS } from "@/types";
import React from "react";
import Icon, { IconKey } from "../atoms/icon";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";

export const orderStatusObject = {
  DRAFT: "Draft",
  IN_PROGRESS: "In-Progress",
  COMPLETED: "Completed",
  DELIVERY_PENDING: "Ready to Deliver",
  DELIVERED: "In Delivery",
};

function OrderStatusIcon({
  value,
  classNames,
  wrapperClassNames,
  withLabel,
}: {
  value: ORDER_STATUS;
  classNames?: string;
  wrapperClassNames?: string;
  withLabel?: boolean;
}) {
  // value === ORDER_STATUS.IN_PROGRESS
  let iconName: IconKey = "MdPending";

  if (value === ORDER_STATUS.COMPLETED) {
    iconName = "BsFillCheckCircleFill";
  }

  if (value === ORDER_STATUS.DELIVERED) {
    iconName = "FaTruckLoading";
  }

  if (value === ORDER_STATUS.DELIVERY_PENDING) {
    iconName = "FaTruckField";
  }

  if (value === ORDER_STATUS.DRAFT) {
    iconName = "LuClipboardList";
  }

  const IconComp = () => (
    <Icon
      name={iconName}
      className={cn(
        clsx(
          "h-6 w-6",
          {
            "text-cyan-600 h-7 w-7": value === ORDER_STATUS.IN_PROGRESS,
            "text-lime-600": value === ORDER_STATUS.COMPLETED,
            "text-rose-400": value === ORDER_STATUS.DELIVERED,
            "text-pink-600": value === ORDER_STATUS.DELIVERY_PENDING,
            "text-yellow-600": value === ORDER_STATUS.DRAFT,
          },
          classNames
        )
      )}
    />
  );

  if (withLabel) {
    return (
      <div
        className={clsx(
          "w-fit min-h-[40px] flex justify-center align-middle items-center gap-2 uppercase border px-2 py-1 rounded-lg min-w-[145px] bg-background",
          wrapperClassNames
        )}
      >
        <IconComp />
        <p className="text-sm font-medium">{orderStatusObject[value]}</p>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <IconComp />
          </TooltipTrigger>
          <TooltipContent className="bg-bw-foreground text-bw">
            <p className="text-base font-medium">{orderStatusObject[value]}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default OrderStatusIcon;
