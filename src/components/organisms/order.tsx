import { useStoreStore } from "@/stores/storeSlice";
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
import Cart from "./cart";
import OrderDetails from "../molecules/order-details";
import OrderStatus from "./order-status";
import { Button } from "@/components/atoms/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs"

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


  const [tab, setTab] = useState('STATUS')

  return (
     
   
      <Tabs defaultValue="account"  className={clsx("flex gap-2 flex-col w-full h-full pt-2 pb-4 bg-background px-2", className)}>
      <TabsList className="grid w-full grid-cols-3 gap-2 bg-background rounded-none">
        <TabsTrigger className="data-[state=active]:shadow-none shadow-none data-[state=active]:border-primary border-2 border-background text-foreground/60" value="cart">Cart</TabsTrigger>
        <TabsTrigger className="data-[state=active]:shadow-none shadow-none data-[state=active]:border-primary border-2 border-background text-foreground/60" value="progress">Progress</TabsTrigger>
        <TabsTrigger className="data-[state=active]:shadow-none shadow-none data-[state=active]:border-primary border-2 border-background text-foreground/60" value="summary">Summary</TabsTrigger>
      </TabsList>
      <Separator className="bg-foreground/50" />
      <OrderDetails order={order}  />
      <Separator  />
      <TabsContent value="cart" className="grow">
        <Cart order={order} control={control} cart={cart} />
      </TabsContent>
      <TabsContent value="progress" className="grow">
        <OrderStatus cart={cart} />
      </TabsContent>
      <TabsContent value="summary" className="grow">
        <BillOut cart={cart}  control={control} />
      </TabsContent>
    </Tabs>

  );
}

export default Order;
