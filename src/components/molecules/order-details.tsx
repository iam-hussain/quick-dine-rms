import { useStoreStore } from "@/stores/storeSlice";
import React from "react";
import { Button } from "../atoms/button";
import Icon from "../atoms/icon";

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
        <div className="flex gap-2 text-xs flex-row justify-between w-full align-middle items-center">
         
         <div className="flex justify-between align-middle items-center gap-4">
         <Button variant={'outline'}>
          <Icon name='IoIosArrowBack' />
         </Button>
         <div>
            
            {(enableCustomerAdding && order?.customerId) && (
              <p className="font-medium">
                {order?.customerId ? order.customerId : "Unknown Name"}
              </p>
            )}
            {order?.shortId && (
              <p className="text-foreground/80">
                Order: <span className="text-foreground font-medium text-xs">#{order?.shortId}
                {order?.table?.key ? ` / ${order?.table?.key}` : ""}</span>
              </p>
            )}
          </div>
         </div>
         

          <div className="text-xs text-right">
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
