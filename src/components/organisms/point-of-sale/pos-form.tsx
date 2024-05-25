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
import { RootState } from "@/store";
import { setUpdateOrder } from "@/store/baseSlice";
import { ProductAPIType } from "@/types";

export default function POSForm() {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState("cart");
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);
  const order = useSelector((state: RootState) => state.base.order);
  const taxes = useSelector((state: RootState) => state.base.settings.taxes);
  const { DELIVERY, PACKING } = useSelector(
    (state: RootState) => state.base.settings.fees,
  );

  const { shortId, table } = order || {};

  const defaultValues: Partial<OrderUpsertSchemaType> = {
    type: order?.type || "TAKE_AWAY",
    items: (order?.items?.drafted || []) as any,
    fees: order?.fees || [],
    taxes: order?.taxes || taxes || [],
    ...(order?.status ? { status: order?.status } : {}),
    ...(table?.key ? { table } : {}),
    ...(shortId ? { shortId } : {}),
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
    [fees],
  );
  const packagingIndex = useMemo(
    () => fees && fees.findIndex((e) => e.key === "PACKING"),
    [fees],
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

  const onItemClick = (e: any, product: ProductAPIType) => {
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

  const onNewOrderClick = () => {
    reset({
      type: "TAKE_AWAY",
      items: [],
      fees: [],
      taxes: taxes || [],
    });
    dispatch(setUpdateOrder(null));
  };

  return (
    <div className="flex md:flex-row flex-col w-full h-full">
      <Form {...form}>
        <POSExplorer
          onItemClick={onItemClick}
          onNewOrderClick={onNewOrderClick}
          className={clsx("h-[1000px]", {
            "h-d-screen-top-close": !topBarOpen,
            "h-d-screen-top-open": topBarOpen,
          })}
        />
        <form
          className={clsx(
            "flex md:flex-row flex-col md:w-4/12 3xl:w-3/12 4xl:2/12 w-full duration-300 transition-all border-l",
            {
              "h-d-screen-top-close": !topBarOpen,
              "h-d-screen-top-open": topBarOpen,
            },
          )}
        >
          <POSCartTabs tabValue={tabValue} setTabValue={setTabValue} />
        </form>
      </Form>
    </div>
  );
}
