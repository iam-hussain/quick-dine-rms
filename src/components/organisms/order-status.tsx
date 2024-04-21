import { useStoreStore } from "@/stores/storeSlice";
import { ScrollArea } from "@/components/atoms/scroll-area";
import React from "react";
import useCart from "@/hooks/useCart";
import ItemsList from "../molecules/items-list";

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
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 cart">
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
