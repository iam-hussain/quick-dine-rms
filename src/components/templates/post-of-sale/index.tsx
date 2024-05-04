"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import schemas, { ORDER_TYPE } from "@/validations";
import { Form } from "@/components/atoms/form";
import { ProductAPI } from "@/types";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import clsx from "clsx";
import { Separator } from "@/components/atoms/separator";
import { OrderContextProvider } from "@/components/providers/order-provider";
import ProductSearch from "@/components/organisms/product-search";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import OrderDetails from "@/components/molecules/order-details";
import OrderStatus from "@/components/organisms/order-status";
import Cart from "@/components/organisms/cart";
import BillOut from "@/components/organisms/bill-out";

export default function PointOfSale() {
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);
  const order = useSelector((state: RootState) => state.base.order);
  const store = useSelector((state: RootState) => state.base.store);

  const {
    shortId,
    drafted = [],
    fees = [],
    table = {},
    type = ORDER_TYPE.TAKE_AWAY,
    status,
  } = order || {};

  const defaultValues: Partial<OrderUpsertSchemaType> = {
    type,
    items: drafted,
    fees,
    taxes: order?.taxes || store?.taxes || [],
    ...(table.key ? { table } : {}),
    ...(shortId ? { shortId } : {}),
    ...(status ? { status } : {}),
  };

  console.log({ defaultValues });

  const form = useForm<OrderUpsertSchemaType>({
    resolver: zodResolver(schemas.cart),
    defaultValues,
    mode: "onSubmit",
  });

  const { control, watch } = form;

  const { append, update } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items", []);

  const onItemClick = (e: any, product: ProductAPI) => {
    e.preventDefault();
    const index = items.findIndex((e) => e.productId === product.id);
    if (index >= 0) {
      update(index, { ...items[index], quantity: items[index].quantity + 1 });
    } else {
      append({
        price: product.price,
        title: product.name,
        note: "",
        quantity: 1,
        position: items.length + 1,
        productId: product.id,
        type: product.type,
      });
    }
  };

  return (
    <div className="flex md:flex-row flex-col w-full h-full">
      <ProductSearch onItemClick={onItemClick} />
      <Form {...form}>
        <form
          className={clsx(
            "flex md:flex-row flex-col md:w-4/12 3xl:w-3/12 w-full duration-300 transition-all",
            {
              "h-d-screen-top-close": !topBarOpen,
              "h-d-screen-top-open": topBarOpen,
            }
          )}
        >
          <OrderContextProvider>
            <Tabs
              defaultValue="cart"
              className={clsx(
                "flex gap-4 flex-col w-full h-full bg-background p-4"
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
              {order?.shortId && <OrderDetails order={order} />}
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
          </OrderContextProvider>
        </form>
      </Form>
    </div>
  );
}
