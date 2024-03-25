import React from "react";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";

type Item = {
  price: number;
  title: string;
  note: string;
  quantity: number;
  productId: string;
};

type CartItemProps = {
  index: number;
  item: Item;
  onAddClick: (i: number, item: Item) => void;
  onSubClick: (i: number, item: Item) => void;
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
    <li className="flex justify-center items-center align-middle gap-2 rounded-md text-sm font-medium text-inactive w-full">
      <div className="grow">
        <p className=" text-left text-foreground">{item.title}</p>

        <p className="text-xs">
          {"Amount: "}
          {Number(item.price).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
      </div>

      <div className="grid grid-cols-3 min-w-[90px]">
        <Button
          className="p-2 rounded-none rounded-tl-lg rounded-bl-lg"
          variant={"default"}
          disabled={item.quantity === 1}
          onClick={() => onSubClick(index, item)}
        >
          <Icon name="RiSubtractFill" />
        </Button>
        <span className="select-none py-2 h-full bg-primary text-primary-foreground text-center">
          {item.quantity}
        </span>
        <Button
          className="p-2 rounded-none rounded-tr-lg rounded-br-lg shadow-none"
          variant={"default"}
          disabled={item.quantity > 10000}
          onClick={() => onAddClick(index, item)}
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
      >
        <Icon name="RiDeleteBinLine" className="h-4 w-4 text-destructive" />
      </Button>
    </li>
  );
}

export default CartItem;
