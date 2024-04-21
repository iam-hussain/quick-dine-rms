"use client";

import { useStoreStore } from "@/stores/storeSlice";
import { ScrollArea } from "@/components/atoms/scroll-area";
import React from "react";
import useCart from "@/hooks/useCart";
import ItemsList from "../molecules/items-list";
import clsx from "clsx";
import { Separator } from "../atoms/separator";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { Control } from "react-hook-form";
import CartSummary from "./cart-summary";
import ButtonToolTip from "../molecules/button-tooltip";
import { Button } from "../atoms/button";



const getGroupedItems = (items: any[]): any[] => {
    const grouped = items.reduce<{ [key in string]: any }>((obj, item) => {
      if (obj[item.productId]) {
        const data = obj[item.productId];
        obj[item.productId] = {
          ...data,
          quantity: data.quantity + item.quantity,
          price: data.price + item.price,
          total: data.total + item.total,
        };
      } else {
        obj[item.productId] = item;
      }
      return obj;
    }, {});
  
    return Object.values(grouped).sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0; // Names are equal
      });
  };

  
export function BillOut({ className, cart, control }: {
  cart: ReturnType<typeof useCart>
  className?: string
  control: Control<OrderUpsertSchemaType>;
}) {
  const grouped = getGroupedItems([...cart.items, ...cart.allItems]) 
  return (
   <div className={clsx("flex flex-col h-full gap-2", className)}>
     <ScrollArea className="w-full flex justify-end grow bg-background px-4 cart">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 pt-2 justify-between h-full">
              <ItemsList  items={grouped} />
          </div>
        </div>
      </ScrollArea>
       <Separator />
       <div className="flex justify-center align-middle items-center gap-4 flex-col text-sm bg-background select-none h-auto px-6">
         <CartSummary items={grouped} control={control} />
         <div className="flex gap-2 w-full">
           <ButtonToolTip
             label="Discord/Cancel"
             icon="MdDeleteOutline"
             variant={"outline"}
             className="text-destructive"
            //  disabled={!order?.shortId}
           />
           <ButtonToolTip
             label="Draft Order"
             icon="FaSave"
             variant={"outline"}
             type="submit"
           />
           
           {cart.showPushToKot && (
             <Button
               className="w-full col-span-2"
               type="submit"
               variant={"secondary"}
             >
               Kitchen Dispatch
             </Button>
           )}
 
           <Button className="w-full col-span-2" type="submit">
             Bill Out
           </Button>
         </div>
       </div>
   </div>
  )
}
