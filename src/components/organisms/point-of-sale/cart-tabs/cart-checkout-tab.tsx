"use client";

import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/atoms/button";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Separator } from "@/components/atoms/separator";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import ItemsList from "@/components/molecules/items-list";
import CartSummary from "@/components/organisms/cart-summary";
import { RootState } from "@/store";

export default function CartCheckOutTab({ className }: { className?: string }) {
  const order = useSelector((state: RootState) => state.base.order);
  const summary = order?.items?.summary || [];

  return (
    <div className={clsx("flex flex-col h-full gap-2", className)}>
      <ScrollArea className="w-full flex justify-end grow bg-background px-4 h-[300px] cart">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 justify-between h-full">
            {summary.length === 0 && (
              <p className="text-sm text-foreground/80 text-center w-full py-6">
                No items found
              </p>
            )}
            <ItemsList items={summary} />
          </div>
        </div>
      </ScrollArea>
      <Separator className="my-2 mt-4" />
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
