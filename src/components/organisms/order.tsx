import { useStoreStore } from "@/stores/storeSlice";
import { Button } from "@/components/atoms/button";
import { ScrollArea } from "@/components/atoms/scroll-area";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import React, { useState } from "react";
import {
  Control,
  useWatch,
  useController,
  useFieldArray,
} from "react-hook-form";
import CartItem from "@/components/molecules/cart-item";
import { Separator } from "@/components/atoms/separator";
import { FormField, FormItem, FormMessage } from "@/components/atoms/form";
import {
  Select,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import useCart from "@/hooks/useCart";
import { CartSchemaValues } from "@/validations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import Icon from "@/components/atoms/icon";
import { StoreAdditionalType } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import ItemsList from "../molecules/items-list";
import { KitchenDispatch } from "./kitchen-dispatch";
import { BillOut } from "./bill-out";
import CartSummary from "./cart-summary";
import OrderDetails from "../molecules/order-details";
import OrderStatus from "./order-status";

function Order({
  className,
  control,
  order,
}: {
  order: any;
  className?: string;
  control: Control<OrderUpsertSchemaType>;
}) {
  const cart = useCart({ control, order });
  const {
    shouldAddPackingCharge,
    shouldAddDeliveryCharge,
    subTotal,
    deliveryCharge,
    packagingCharge,
    items,
    taxesValue,
    grandTotal,
    showPushToKot,
    allItems,
    scheduledItems,
    placedItems,
    acceptedItems,
    preparedItems,
  } = cart
  const {
    enableExpressOrder,
  } = useStoreStore((state) => state.featureFlags);

  const [tab, setTab] = useState('CART')

  return (
    <div className={clsx("flex flex-col gap-4 w-full h-full py-4 bg-background px-2", className)}>
      <OrderDetails order={order} />
        {items.length !== 0 ? <CartSummary order={order} control={control} cart={cart} /> :<OrderStatus cart={cart} /> }
   
    </div>

  );
}

export default Order;
