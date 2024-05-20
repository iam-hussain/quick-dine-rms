"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import { ProductAPI } from "@/types";
import {
  ORDER_TYPE,
  OrderUpsertSchema,
  OrderUpsertSchemaType,
} from "@iam-hussain/qd-copilot";
import clsx from "clsx";
import { Separator } from "@/components/atoms/separator";
import ProductSearch from "@/components/organisms/product-search";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import OrderDetails from "@/components/molecules/order-details";
import OrderStatus from "@/components/templates/post-of-sale/tabs/order-status";
import OrderCart from "@/components/templates/post-of-sale/tabs/order-cart";
import OrderCheckOut from "@/components/templates/post-of-sale/tabs/order-checkout";
import { useEffect, useMemo, useState } from "react";

export default function PointOfSale() {
  const [tabValue, setTabValue] = useState("cart");
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);
  const order = useSelector((state: RootState) => state.base.order);
  const taxes = useSelector((state: RootState) => state.base.settings.taxes);
  const { DELIVERY, PACKING } = useSelector(
    (state: RootState) => state.base.settings.fees
  );

  const { shortId, drafted = [], table = {}, status } = order || {};

  const defaultValues: Partial<OrderUpsertSchemaType> = {
    type: order?.type || "TAKE_AWAY",
    items: drafted,
    fees: order?.fees || [],
    taxes: order?.taxes || taxes || [],
    ...(table.key ? { table } : {}),
    ...(shortId ? { shortId } : {}),
    ...(status ? { status } : {}),
  };

  const form = useForm<OrderUpsertSchemaType>({
    resolver: zodResolver(OrderUpsertSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { control, watch } = form;

  const itemsControl = useFieldArray({
    control,
    name: "items",
  });

  const feesControl = useFieldArray({
    control,
    name: "fees",
  });

  const items = watch("items", []);
  const type = watch("type", ORDER_TYPE.Values.TAKE_AWAY as any);
  const fees = watch("fees", []);

  const deliveryIndex = useMemo(
    () => fees && fees.findIndex((e) => e.key === "DELIVERY"),
    [fees]
  );
  const packagingIndex = useMemo(
    () => fees && fees.findIndex((e) => e.key === "PACKING"),
    [fees]
  );

  useEffect(() => {
    if (
      type &&
      [
        ORDER_TYPE.Values.DELIVERY,
        ORDER_TYPE.Values.PLATFORM,
        ORDER_TYPE.Values.TAKE_AWAY,
      ].includes(type as any)
    ) {
      if (packagingIndex && packagingIndex < 0) {
        feesControl.append(PACKING);
      }
    } else if (packagingIndex && packagingIndex >= 0) {
      feesControl.remove(packagingIndex);
    }

    if (type && type === ORDER_TYPE.Values.DELIVERY) {
      if (deliveryIndex && deliveryIndex < 0) {
        feesControl.append(DELIVERY);
      }
    } else if (deliveryIndex && deliveryIndex >= 0) {
      feesControl.remove(deliveryIndex);
    }
  }, [DELIVERY, PACKING, deliveryIndex, feesControl, packagingIndex, type]);

  const onItemClick = (e: any, product: ProductAPI) => {
    e.preventDefault();
    setTabValue("cart");
    const index = items.findIndex((e) => e.productId === product.id);
    if (index >= 0) {
      itemsControl.update(index, {
        ...items[index],
        quantity: items[index].quantity + 1,
      });
    } else {
      itemsControl.append({
        price: product.price,
        title: product.name,
        note: "",
        quantity: 1,
        position: items.length + 1,
        productId: product.id,
        type: product.type,
        ...(product.kitchenCategoryId
          ? { kitchenCategoryId: product.kitchenCategoryId }
          : {}),
      });
    }
  };

  return (
    <div className="flex md:flex-row flex-col w-full h-full">
      <ProductSearch
        onItemClick={onItemClick}
        className={clsx("h-[1000px]", {
          "h-d-screen-top-close": !topBarOpen,
          "h-d-screen-top-open": topBarOpen,
        })}
      />
      <Form {...form}>
        <form
          className={clsx(
            "flex md:flex-row flex-col md:w-4/12 3xl:w-3/12 4xl:2/12 w-full duration-300 transition-all border-l",
            {
              "h-d-screen-top-close": !topBarOpen,
              "h-d-screen-top-open": topBarOpen,
            }
          )}
        >
          <Tabs
            defaultValue={"cart"}
            value={tabValue}
            onValueChange={setTabValue}
            className={clsx(
              "flex gap-4 flex-col w-full h-full bg-background p-4"
            )}
          >
            <TabsList className="grid w-full grid-cols-3 gap-x-2 bg-background rounded-none p-0 mt-1 -mb-1">
              <TabsTrigger
                className="text-base data-[state=active]:shadow-none shadow-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-0 select-none text-foreground/80 py-2 rounded-none rounded-tl-lg rounded-tr-lg"
                value="cart"
              >
                Cart
              </TabsTrigger>
              <TabsTrigger
                className="text-base data-[state=active]:shadow-none shadow-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-0 select-none text-foreground/80 py-2 rounded-none rounded-tl-lg rounded-tr-lg"
                value="progress"
              >
                Progress
              </TabsTrigger>
              <TabsTrigger
                className="text-base data-[state=active]:shadow-none shadow-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-0 select-none text-foreground/80 py-2 rounded-none rounded-tl-lg rounded-tr-lg"
                value="summary"
              >
                Summary
              </TabsTrigger>
              <Separator className="bg-primary col-span-3" />
            </TabsList>
            {order?.shortId && <OrderDetails order={order} />}
            <TabsContent value="cart" className="grow">
              <OrderCart />
            </TabsContent>
            <TabsContent value="progress" className="grow">
              <OrderStatus />
            </TabsContent>
            <TabsContent value="summary" className="grow">
              <OrderCheckOut />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
