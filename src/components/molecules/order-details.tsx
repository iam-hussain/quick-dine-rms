import { useStoreStore } from "@/stores/storeSlice";
import React from "react";
import { Button } from "../atoms/button";
import Icon from "../atoms/icon";

function OrderDetails({ order }: { order: any }) {
  const { enableCustomerAdding, showUpdatedDate } = useStoreStore(
    (state) => state.featureFlags
  );

  return (
    <div className="flex gap-2 text-xs flex-row justify-between w-full align-middle items-center p-2 px-4 bg-paper rounded-bl-lg rounded-br-lg -mb-2">
      <div className="flex justify-between align-middle items-center gap-1">
        {enableCustomerAdding && order?.customerId && (
          <p className="font-medium">
            {order?.customerId ? order.customerId : "Unknown Name"}
          </p>
        )}
        {order?.shortId && (
          <p className="text-foreground/80">
            Order:{" "}
            <span className="text-foreground font-medium text-xs">
              #{order?.shortId}
              {order?.table?.key ? ` / ${order?.table?.key}` : ""}
            </span>
          </p>
        )}
      </div>
      <div className="text-xs text-right flex flex-col gap-1">
        <p className="">
          {order?.status || "Unsaved"} {order?.type ? ` / ${order.type}` : ""}
        </p>
        {showUpdatedDate && order?.updatedAt && (
          <p className="text-foreground/80">
            {new Date(order.updatedAt).toLocaleString()}
          </p>
        )}
        {!showUpdatedDate && order?.createdAt && (
          <p className="text-foreground/80">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
