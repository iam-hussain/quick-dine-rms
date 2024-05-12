"use client";

import { useSelector } from "react-redux";
import React from "react";
import clsx from "clsx";
import { ScrollArea } from "@/components/atoms/scroll-area";
import ItemsList from "../../../molecules/items-list";
import { Separator } from "../../../atoms/separator";
import CartSummary from "../../../organisms/cart-summary";
import ButtonToolTip from "../../../molecules/button-tooltip";
import { Button } from "../../../atoms/button";
import useCartSettings from "@/hooks/useCartSettings";
import { RootState } from "@/store";

export default function OrderCheckOut({ className }: { className?: string }) {
  const order = useSelector((state: RootState) => state.base.order);
  const summary = order?.summary || [];

  return (
    <div className={clsx("flex flex-col h-full gap-2", className)}>
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 cart">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 pt-2 justify-between h-full">
            {summary.length === 0 && (
              <p className="text-sm text-foreground/80 text-center w-full py-6">
                No items found
              </p>
            )}
            <ItemsList items={summary} />
          </div>
        </div>
      </ScrollArea>
      <Separator />
      <div className="flex justify-center align-middle items-center gap-4 flex-col text-sm bg-background select-none h-auto px-6">
        <CartSummary items={summary} />
        <div className="flex gap-2 w-full">
          <ButtonToolTip
            label="Discord/Cancel"
            icon="MdDeleteOutline"
            variant={"outline"}
            className="text-destructive"
            disabled={!order?.shortId}
          />
          <ButtonToolTip
            label="Draft Order"
            icon="FaSave"
            variant={"outline"}
            type="submit"
          />

          <Button className="w-full col-span-2" type="submit">
            Bill Out
          </Button>
        </div>
      </div>
    </div>
  );
}
