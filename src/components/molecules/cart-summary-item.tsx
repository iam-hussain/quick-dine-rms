import React from "react";

function CartSummaryItem({
  name,
  price,
}: {
    name: string;
    price: number;
}) {

  return (
    <div className="flex gap-2 justify-between align-middle items-center w-full">
        <span>{name}</span>
        <span>
        {Number(price).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
        })}
        </span>
    </div>
    )

}

export default CartSummaryItem;
