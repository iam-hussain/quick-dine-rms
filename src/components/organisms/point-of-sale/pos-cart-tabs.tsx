"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Separator } from "@/components/atoms/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs-primary";
import OrderDetails from "@/components/molecules/order-details";
import CartStatusTab from "@/components/organisms/point-of-sale/cart-tabs/cart-status-tab";
import CartOrderTab from "@/components/organisms/point-of-sale/cart-tabs/cart-order-tab";
import CartCheckOutTab from "@/components/organisms/point-of-sale/cart-tabs/cart-checkout-tab";

export default function POSCartTabs({
  tabValue,
  setTabValue,
}: {
  tabValue: string;
  setTabValue: ((value: string) => void) | undefined;
}) {
  const order = useSelector((state: RootState) => state.base.order);

  return (
    <Tabs
      defaultValue={"cart"}
      value={tabValue}
      onValueChange={setTabValue}
      className="flex flex-col w-full gap-4 py-4 px-2"
    >
      <TabsList className="rounded-none grid grid-cols-3 justify-center w-full">
        <TabsTrigger value="cart">Cart</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      <Separator className="bg-primary col-span-3" />
      {order?.shortId && <OrderDetails order={order} />}
      <TabsContent value="cart" className="grow">
        <CartOrderTab />
      </TabsContent>
      <TabsContent value="progress" className="grow">
        <CartStatusTab />
      </TabsContent>
      <TabsContent value="summary" className="grow">
        <CartCheckOutTab />
      </TabsContent>
    </Tabs>
  );
}
