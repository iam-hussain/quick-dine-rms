import clsx from "clsx";
import React, { useContext } from "react";
import { Separator } from "@/components/atoms/separator";
import { BillOut } from "./bill-out";
import Cart from "./cart";
import OrderDetails from "../molecules/order-details";
import OrderStatus from "./order-status";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { OrderContext } from "../providers/order-provider";

function Order({ className }: { className?: string }) {
  const { order } = useContext(OrderContext);

  return (
    <Tabs
      defaultValue="cart"
      className={clsx(
        "flex gap-4 flex-col w-full h-full pb-4 pt-1 bg-background px-2",
        className
      )}
    >
      <TabsList className="grid w-full grid-cols-3 gap-x-2 bg-background rounded-none p-0 mt-1 -mb-1">
        <TabsTrigger
          className="data-[state=active]:shadow-none shadow-none data-[state=active]:bg-paper border-0 select-none text-foreground/60 py-2 rounded-none rounded-tl-lg rounded-tr-lg"
          value="cart"
        >
          Cart
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:shadow-none shadow-none data-[state=active]:bg-paper border-0 select-none text-foreground/60 py-2 rounded-none rounded-tl-lg rounded-tr-lg"
          value="progress"
        >
          Progress
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:shadow-none shadow-none data-[state=active]:bg-paper border-0 select-none text-foreground/60 py-2 rounded-none rounded-tl-lg rounded-tr-lg"
          value="summary"
        >
          Summary
        </TabsTrigger>
        <Separator className="bg-paper h-1 my-0 col-span-3" />
      </TabsList>
      {order?.shortId && (
        <>
          <OrderDetails order={order} />
          {/* <Separator className="my-0" /> */}
        </>
      )}
      <TabsContent value="cart" className="grow">
        <Cart />
      </TabsContent>
      <TabsContent value="progress" className="grow">
        <OrderStatus />
      </TabsContent>
      <TabsContent value="summary" className="grow">
        <BillOut />
      </TabsContent>
    </Tabs>
  );
}

export default Order;
