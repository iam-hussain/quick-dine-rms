import React from "react";

import useCartSettings from "@/hooks/useCartSettings";
import useOrderSummary from "@/hooks/useOrderSummary";
import { ItemType } from "@/types";

import CartSummaryItem from "../molecules/cart-summary-item";

function CartSummary({ items }: { className?: string; items: ItemType[] }) {
  const { shouldAddPackingCharge, shouldAddDeliveryCharge } = useCartSettings();
  const { subTotal, packagingCharge, deliveryCharge, taxesValue, grandTotal } =
    useOrderSummary({
      items,
    });

  return (
    <div className="flex flex-col justify-center align-middle items-center w-full text-base text-foreground/80">
      <CartSummaryItem name="Subtotal" price={subTotal} />
      {shouldAddPackingCharge && (
        <CartSummaryItem name="Packaging" price={packagingCharge} />
      )}
      {shouldAddDeliveryCharge && (
        <CartSummaryItem name="Delivery" price={deliveryCharge} />
      )}
      {taxesValue &&
        taxesValue.map((e: { key: string; name: string; amount: any }) => (
          <CartSummaryItem key={e.key} name={e.name} price={e.amount} />
        ))}
      <CartSummaryItem name="Grand Total" price={grandTotal} />
    </div>
  );
}

export default CartSummary;
