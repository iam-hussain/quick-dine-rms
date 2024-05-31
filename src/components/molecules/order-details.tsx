import React from "react";
import { useSelector } from "react-redux";

import useOrderQuery from "@/hooks/useOrderQuery";
import { formatDateTime } from "@/lib/date-time";
import { RootState } from "@/store";
import { OrderAPIType } from "@/types";

import { Button } from "../atoms/button";
import Icon from "../atoms/icon";
import OrderStatusIcon from "./order-status-icon";
import OrderTypeIcon from "./order-type-icon";

function OrderDetails({ order }: { order: OrderAPIType }) {
  const featureFlags = useSelector(
    (state: RootState) => state.base.featureFlags
  );
  const { enableCustomerAdding, showUpdatedDate } = featureFlags;
  const { refresh } = useOrderQuery();

  return (
    <div className="flex flex-col gap-2 px-4 justify-center align-middle items-center">
      <div className="flex justify-between align-middle items-center w-full gap-2">
        <div className="flex w-max justify-center items-center align-middle">
          <div className="flex justify-center align-middle items-center gap-2">
            <p className="text-foreground/80 w-max">
              Order:{" "}
              <span className="text-foreground font-medium text-lg">
                #{order?.shortId}
                {order?.table?.key ? ` / ${order?.table?.key}` : ""}
              </span>
            </p>
            <Button
              variant={"transparent"}
              className="p-0 hover:scale-110 active:scale-95"
              onClick={() => order?.shortId && refresh(order?.shortId)}
            >
              <Icon name="IoReloadCircleSharp" className="h-8 w-8" />
            </Button>
          </div>

          {enableCustomerAdding && order?.customerId && (
            <p className="font-medium">
              {order?.customerId ? order.customerId : "Unknown Name"}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center align-middle items-end gap-2">
          <div className="flex gap-2 flex-wrap justify-end align-middle items-end">
            <OrderStatusIcon
              value={order.status}
              classNames="text-foreground/90"
              withLabel={true}
            />
            {order?.type && (
              <OrderTypeIcon
                value={order.type}
                classNames="text-foreground/90"
                withLabel={true}
              />
            )}
          </div>
          <p className="text-foreground/90 font-medium text-sm w-full text-right">
            <span className="text-foreground/80 text-xs">
              {showUpdatedDate && order?.updatedAt
                ? "Updated @ "
                : "Created @ "}
            </span>{" "}
            {formatDateTime(
              showUpdatedDate && order?.updatedAt
                ? order?.updatedAt
                : order.createdAt
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
