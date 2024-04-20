import { useStoreStore } from "@/stores/storeSlice";
import { ScrollArea } from "@/components/atoms/scroll-area";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import React from "react";
import {
  Control,
  useFieldArray,
} from "react-hook-form";
import CartItem from "@/components/molecules/cart-item";
import { Separator } from "@/components/atoms/separator";
import useCart from "@/hooks/useCart";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import ItemsList from "../molecules/items-list";
import { KitchenDispatch } from "./kitchen-dispatch";
import { BillOut } from "./bill-out";
import OrderDetails from "../molecules/order-details";
import OrderTypeSelect from "../molecules/order-type-select";
import TableSelection from "./table-selection";
import CartSummaryItem from "../molecules/cart-summary-item";

function OrderStatus({
  cart,
}: {
  cart: ReturnType<typeof useCart>
}) {
  const {
    allItems,
    scheduledItems,
    placedItems,
    acceptedItems,
    preparedItems,
  } = cart

  const {
    enableKDS,
  } = useStoreStore((state) => state.featureFlags);

  return (
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 h-0 cart">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 pt-2 justify-between h-full">
            {!enableKDS && <ItemsList label="Ordered" items={allItems} />}
            {enableKDS && (
              <>
                <ItemsList label="Scheduled" items={scheduledItems} />
                <ItemsList label="Placed" items={placedItems} />
                <ItemsList label="Accepted" items={acceptedItems} />
                <ItemsList label="Completed" items={preparedItems} />
              </>
            )}
          </div>
        </div>
      </ScrollArea>
  );
}

export default OrderStatus;
