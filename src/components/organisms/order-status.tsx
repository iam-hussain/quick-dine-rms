import { useStoreStore } from "@/store/storeSlice";
import { ScrollArea } from "@/components/atoms/scroll-area";
import React from "react";
import ItemsList from "../molecules/items-list";
import useCartItems from "@/hooks/useCartItems";

function OrderStatus() {
  const { all, drafted, scheduled, placed, accepted, prepared } =
    useCartItems();
  const { enableKDS } = useStoreStore((state) => state.featureFlags);

  return (
    <ScrollArea className="w-full flex justify-end grow bg-background px-4 cart">
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-4 pt-2 justify-between h-full">
          {(all.length === drafted.length || all.length === 0) && (
            <p className="text-sm text-foreground/80 text-center w-full py-6">
              No items found
            </p>
          )}
          {!enableKDS && <ItemsList label="Ordered" items={all} />}
          {enableKDS && (
            <>
              <ItemsList label="Scheduled" items={scheduled} />
              <ItemsList label="Placed" items={placed} />
              <ItemsList label="Accepted" items={accepted} />
              <ItemsList label="Completed" items={prepared} />
            </>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

export default OrderStatus;
