import React from "react";
import CartSummaryItem from "../molecules/cart-summary-item";
import useCartSummary from "@/hooks/useCartSummary";
import useCartSettings from "@/hooks/useCartSettings";
import { OrderItem } from "@/types";

function CartSummary({
  className,
  items,
}: {
  className?: string;
  items: OrderItem[];
}) {
  const { shouldAddPackingCharge, shouldAddDeliveryCharge, showPushToKot } =
    useCartSettings();
  const { subTotal, packagingCharge, deliveryCharge, taxesValue, grandTotal } =
    useCartSummary({
      items,
    });

  return (
    <div className="flex flex-col justify-center align-middle items-center w-full text-sm text-foreground/80">
      <CartSummaryItem name="Subtotal" price={subTotal} />
      {shouldAddPackingCharge && (
        <CartSummaryItem name="Packaging" price={packagingCharge} />
      )}
      {shouldAddDeliveryCharge && (
        <CartSummaryItem name="Delivery" price={deliveryCharge} />
      )}
      {taxesValue &&
        taxesValue.map(
          (e: { key: string; name: string; amount: any }, i: any) => (
            <CartSummaryItem key={e.key} name={e.name} price={e.amount} />
          )
        )}
      <CartSummaryItem name="Grand Total" price={grandTotal} />
    </div>
  );
}

export default CartSummary;
