import { useStoreStore } from "@/stores/storeSlice";
import React from "react";

function OrderDetails({
    order,
}: {
    order: any;
}) {
  const {
    enableCustomerAdding,
    showUpdatedDate,
  } = useStoreStore((state) => state.featureFlags);


  return (
        <div className="flex gap-2 text-sm flex-row justify-between w-full py-2">
          <div>
            {enableCustomerAdding && (
              <p className="font-medium">
                {order?.customerId ? order.customerId : "Unknown Name"}
              </p>
            )}
            {order?.shortId && (
              <p className="text-foreground/80">
                Order: #{order?.shortId}
                {order?.table?.key ? ` / ${order?.table?.key}` : ""}
              </p>
            )}
          </div>

          <div className="text-sm text-right">
            <p className="">
              {order?.status || "Unsaved"}{" "}
              {order?.type ? ` / ${order.type}` : ""}
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
