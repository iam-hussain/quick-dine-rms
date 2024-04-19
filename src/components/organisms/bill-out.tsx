"use client";

import { Button } from "@/components/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import clsx from "clsx";
import ItemsList from "../molecules/items-list";



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

  
export function BillOut({ btnClassName, items, fetched }: {
    btnClassName?: string,
    items: any[],
    fetched: any
}) {
    const grouped = getGroupedItems(fetched?.items ? [...fetched.items, ...items]: items || []) 
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={clsx(btnClassName)}  type="submit" variant={'outline'}>Bill Out</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bill Summary</DialogTitle>
          <DialogDescription>
          Efficiently consolidate payment details with order summaries for seamless processing and accurate bill summaries.
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-2">
             <ItemsList items={grouped} />
        </ul>
        <DialogFooter>
          <Button type="submit">Push to Kitchen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
