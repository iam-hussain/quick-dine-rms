import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ScrollArea } from "@/components/atoms/scroll-area";
import React from "react";
import ItemsList from "@/components/molecules/items-list";

function CartStatusTab() {
  const order = useSelector((state: RootState) => state.base.order);
  const { enableKDS } = useSelector(
    (state: RootState) => state.base.featureFlags
  );

  const {
    validCount = 0,
    scheduled = [],
    rejected = [],
    placed = [],
    accepted = [],
    completed = [],
  } = order?.items || {};

  return (
    <div className={"flex flex-col h-full gap-2"}>
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 cart">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 pt-2 justify-between">
            {validCount === 0 && (
              <p className="text-sm text-foreground/80 text-center w-full py-6">
                No items found
              </p>
            )}
            {!enableKDS && (
              <ItemsList
                label="Ordered"
                items={[...scheduled, ...placed, ...accepted, ...completed]}
              />
            )}
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
    </div>
  );
}

export default CartStatusTab;
