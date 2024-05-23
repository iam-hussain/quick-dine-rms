import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Separator } from "../atoms/separator";
import Icon from "../atoms/icon";
import { Button } from "../atoms/button";
import usePOSCart from "@/hooks/usePOSCart";
import { OrderAPIType } from "@/types";
import { dateTimeFormat } from "@/lib/date-time";

const OrderStatusValues = {
  DRAFT: "Draft",
  IN_PROGRESS: "In-Progress",
  COMPLETED: "Completed",
  DELIVERY_PENDING: "Ready to Deliver",
  DELIVERED: "In Delivery",
};

const OrderTypeValues = {
  DINING: "Dine In",
  TAKE_AWAY: "Take Away",
  PICK_UP: "Express",
  DELIVERY: "Delivery",
  PLATFORM: "Platform",
};

function OrderDetails({ order }: { order: OrderAPIType }) {
  const featureFlags = useSelector(
    (state: RootState) => state.base.featureFlags
  );
  const { enableCustomerAdding, showUpdatedDate } = featureFlags;
  const { refetch } = usePOSCart();

  return (
    <div className="flex gap-2 text-sm flex-col justify-between w-full align-middle items-center p-2 px-4">
      <div className="flex gap-2 text-sm flex-row justify-between w-full align-middle items-center">
        <div className="flex justify-between align-middle items-center gap-1">
          {enableCustomerAdding && order?.customerId && (
            <p className="font-medium">
              {order?.customerId ? order.customerId : "Unknown Name"}
            </p>
          )}
          {order?.shortId && (
            <p className="text-foreground/80 flex justify-start align-middle items-center gap-2">
              Order:{" "}
              <span className="text-foreground font-medium text-base">
                #{order?.shortId}
                {order?.table?.key ? ` / ${order?.table?.key}` : ""}
              </span>
              <Button
                variant={"transparent"}
                className="p-0 hover:scale-110 active:scale-95"
                onClick={() => order?.shortId && refetch(order?.shortId)}
              >
                <Icon name="IoReloadCircleSharp" className="h-8 w-8" />
              </Button>
            </p>
          )}
        </div>
        <div className="text-sm text-right flex flex-col gap-1 font-medium">
          <p className="uppercase">
            {OrderStatusValues[order?.status] || "Unsaved"}{" "}
            {order?.type ? ` / ${OrderTypeValues[order.type]}` : ""}
          </p>
          {showUpdatedDate && order?.updatedAt && (
            <p className="text-foreground/80">
              {dateTimeFormat(order.updatedAt)}
            </p>
          )}
          {!showUpdatedDate && order?.createdAt && (
            <p className="text-foreground/80">
              {dateTimeFormat(order.createdAt)}
            </p>
          )}
        </div>
      </div>
      <Separator className="bg-accent" />
    </div>
  );
}

export default OrderDetails;
