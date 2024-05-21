import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ScrollArea } from "@/components/atoms/scroll-area";
import React from "react";
import ItemsList from "../../../molecules/items-list";

function OrderStatus() {
  const order = useSelector((state: RootState) => state.base.order);
  const { enableKDS } = useSelector(
    (state: RootState) => state.base.featureFlags
  );

  const {
    valid = [],
    scheduled = [],
    rejected = [],
    placed = [],
    accepted = [],
    completed = [],
  } = order?.items || {};

  const allItems = order?.items || [];

  return (
    <ScrollArea className="w-full flex justify-end grow bg-background px-4 cart">
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-4 pt-2 justify-between h-full">
          {valid.length === 0 && (
            <p className="text-sm text-foreground/80 text-center w-full py-6">
              No items found
            </p>
          )}
          {!enableKDS && <ItemsList label="Ordered" items={valid} />}
          {enableKDS && (
            <>
              <ItemsList label="Scheduled" items={scheduled} />
              <ItemsList label="Pending" items={placed} />
              <ItemsList label="Cooking" items={accepted} />
              <ItemsList label="Completed" items={completed} />
            </>
          )}
          {Boolean(rejected.length) && (
            <ItemsList label="Rejected" items={rejected} />
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

export default OrderStatus;
