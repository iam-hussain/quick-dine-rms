"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ORDER_TYPE,
  OrderUpsertSchema,
  OrderUpsertSchemaType,
} from "@iam-hussain/qd-copilot";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "@/components/atoms/form";
import POSCartTabs from "@/components/organisms/point-of-sale/pos-cart-tabs";
import POSExplorer from "@/components/organisms/pos-explorer";
import OrderParamProvider from "@/components/templates/order-param-provider";
import { RootState } from "@/store";
import { setOrder } from "@/store/baseSlice";
import { ProductAPIType } from "@/types";

export default function POSForm() {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState("cart");
  const taxes = useSelector((state: RootState) => state.base.settings.taxes);
  const { DELIVERY, PACKING } = useSelector(
    (state: RootState) => state.base.settings.fees
  );

  const defaultValues: Partial<OrderUpsertSchemaType> = {
    type: "TAKE_AWAY",
    items: [],
    fees: [],
    taxes: taxes || [],
  };

  const form = useForm<OrderUpsertSchemaType>({
    resolver: zodResolver(OrderUpsertSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { control, watch, reset } = form;

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

  const handleProductOnClick = (e: any, product: ProductAPIType) => {
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

  const handleNewOrderAction = () => {
    reset({
      type: "TAKE_AWAY",
      items: [],
      fees: [],
      taxes: taxes || [],
    });
    dispatch(setOrder(null));
  };

  return (
    <Form {...form}>
      {/* <div className="flex flex-col md:w-8/12 3xl:w-9/12 4xl:w-10/12 w-full h-full pb-4"> */}
      <div className="flex w-full h-full bg-background">
        <POSExplorer
          onItemClick={handleProductOnClick}
          onNewOrderClick={handleNewOrderAction}
        />
        <OrderParamProvider>
          <form
            className={clsx(
              "flex md:flex-row flex-col md:w-4/12 3xl:w-3/12 4xl:2/12 w-full duration-300 transition-all border-l"
            )}
          >
            <POSCartTabs tabValue={tabValue} setTabValue={setTabValue} />
          </form>
        </OrderParamProvider>
      </div>
    </Form>
  );
}
