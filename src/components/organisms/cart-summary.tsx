import React from "react";
import {
  Control,
} from "react-hook-form";
import { ItemCreateSchemaType, OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import CartSummaryItem from "../molecules/cart-summary-item";
import useCartSummary from "@/hooks/useCartSummary";

function CartSummary({
  className,
  control,
  items,
}: {
  className?: string;
  control: Control<OrderUpsertSchemaType>;
  items: ItemCreateSchemaType[]
}) {
  
  const { subTotal, shouldAddPackingCharge, packagingCharge, shouldAddDeliveryCharge, deliveryCharge, taxesValue, grandTotal } = useCartSummary({
     control, 
     items
  })
  
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
