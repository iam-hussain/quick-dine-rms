import React from "react";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";
import { ItemCreateSchemaType } from "@iam-hussain/qd-copilot";

type CartItemProps = {
  index: number;
  item: ItemCreateSchemaType;
  onAddClick: (i: number) => void;
  onSubClick: (i: number) => void;
  onRemoveClick: (i: number) => void;
};

function CartItem({
  index,
  item,
  onAddClick,
  onSubClick,
  onRemoveClick,
}: CartItemProps) {
  return (
    <li className="flex justify-center items-center align-middle gap-4 rounded-md text-base font-medium text-inactive w-full">
      <div className="grow">
        <p className=" text-left text-foreground">{item.title}</p>

        <p className="text-sm">
          {"Amount: "}
          {Number(item.price).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
      </div>

      <div className="grid grid-cols-3 min-w-[90px]">
        <Button
          className="p-2 rounded-none rounded-tl-lg rounded-bl-lg shadow-none h-full"
          variant={"default"}
          disabled={item.quantity === 1}
          onClick={() => onSubClick(index)}
          type="button"
        >
          <Icon name="RiSubtractFill" />
        </Button>
        <span className="select-none py-2 h-full bg-primary text-primary-foreground text-center">
          {item.quantity}
        </span>
        <Button
          className="p-2 rounded-none rounded-tr-lg rounded-br-lg shadow-none h-full"
          variant={"default"}
          disabled={item.quantity > 10000}
          onClick={() => onAddClick(index)}
          type="button"
        >
          <Icon name="IoMdAdd" />
        </Button>
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
        onClick={() => onRemoveClick(index)}
        type="button"
      >
        <Icon name="RiDeleteBinLine" className="h-4 w-4 text-destructive" />
      </Button>
    </li>
  );
}

export default CartItem;
