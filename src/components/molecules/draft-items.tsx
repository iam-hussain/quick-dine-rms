import React from "react";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";
import { CartItemSchemaValues } from "@/validations";
import { ItemCreateSchemaType } from "@iam-hussain/qd-copilot";

type DraftItemsProps = {
  label?: string;
  items: ItemCreateSchemaType[];
};

function DraftItems({ label, items }: DraftItemsProps) {
  return (
    <ul className="flex flex-col gap-2 pt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {label || "Drafted"}
          </span>
        </div>
      </div>

      {items.map((item: any) => (
        <li
          key={item.id}
          className="flex justify-center items-center align-middle gap-2 text-sm font-medium text-inactive w-full"
        >
          <div className="grow">
            <p className=" text-left text-foreground">{item.title}</p>
          </div>

          <div className="flex justify-end align-middle items-center gap-2 min-w-28">
            <span className="text-xs">
              {Number(item.price).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span>x</span>
            <span className="select-none text-foreground text-center">
              {item.quantity}
            </span>
          </div>
          <span className="min-w-20 flex justify-end text-foreground">
            {Number(item.price * item.quantity).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </span>

          <Button
            variant={"ghost"}
            className="p-1"
            onClick={() => {}}
            type="button"
          >
            <Icon name="RiDeleteBinLine" className="h-4 w-4 text-destructive" />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default DraftItems;
