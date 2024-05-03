"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import schemas, { ORDER_TYPE } from "@/validations";
import { Form } from "@/components/atoms/form";
import { useStoreStore } from "@/store/storeSlice";
import { ProductAPI, StoreAdditionalType } from "@/types";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import clsx from "clsx";
import Order from "@/components/organisms/order";
import { OrderContextProvider } from "@/components/providers/order-provider";
import ProductSearch from "../../organisms/product-search";

export default function PointOfSale({
  categories,
  products,
  orderData,
}: {
  categories: any[];
  products: any[];
  orderData: any;
}) {
  const { taxes } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);

  const {
    shortId,
    drafted = [],
    fees = [],
    table = {},
    type = ORDER_TYPE.TAKE_AWAY,
    status,
  } = orderData || {};

  const defaultValues: Partial<OrderUpsertSchemaType> = {
    // type,
    // items: drafted,
    // fees,
    // taxes: orderData?.taxes || taxes,
    // ...(table.key ? { table } : {}),
    // ...(shortId ? { shortId } : {}),
    // ...(status ? { status } : {}),
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

  const onProductClick = (e: any, product: ProductAPI) => {
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
      <ProductSearch
        products={products}
        categories={categories}
        onProductClick={onProductClick}
      />
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
            <Order />
          </OrderContextProvider>
        </form>
      </Form>
    </div>
  );
}
