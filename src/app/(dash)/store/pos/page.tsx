"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import SearchBar from "@/components/organisms/search-bar";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/atoms/button";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import schemas, { ORDER_TYPE } from "@/validations";
import { Form } from "@/components/atoms/form";
import { useEffect, useState } from "react";
import { isValidArray } from "@/lib/utils";
import { useStoreStore } from "@/stores/storeSlice";
import { ProductAPI, StoreAdditionalType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import clsx from "clsx";
import { useActionStore } from "@/stores/actionSlice";
import Order from "@/components/organisms/order";
import { OrderContextProvider } from "@/components/providers/order-provider";

export default function POS() {
  const [selectedCat, setSelectedCat] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const { taxes } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );
  const isTopBarHidden = useActionStore((state) => state.isTopBarHidden);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // const { data: orderData } = useQuery({
  //   queryKey: [`order_${id || ""}`],
  //   queryFn: () => instance.get(`/store/order/${id}`) as unknown as any[],
  //   enabled: Boolean(id),
  // });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get("/store/categories") as unknown as any[],
  });

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () => instance.get("/store/products") as unknown as any[],
  });

  useEffect(() => {
    if (categoriesData && isValidArray(categoriesData)) {
      setCategories(
        categoriesData.filter((e) => Boolean(e.productsConnected)) as any
      );
    }
  }, [categoriesData]);

  useEffect(() => {
    if (isValidArray(productsData)) {
      setProducts(productsData as any);
    }
  }, [productsData]);

  useEffect(() => {
    if (productsData && isValidArray(productsData)) {
      if (selectedCat) {
        setProducts(productsData.filter((e) => e.categoryId === selectedCat));
      } else {
        setProducts(productsData);
      }
    }
  }, [productsData, selectedCat]);

  // useEffect(() => {
  //   console.log({ orderData });
  // }, [orderData]);

  const defaultValues: Partial<OrderUpsertSchemaType> = {
    type: ORDER_TYPE.TAKE_AWAY,
    items: [],
    fees: [],
    taxes: taxes,
  };

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

  async function onSubmit({ table, ...variables }: OrderUpsertSchemaType) {
    console.log({ variables });
  }

  return (
    <div className="flex md:flex-row flex-col w-full h-full">
      <div className="flex flex-col md:w-8/12 3xl:w-9/12 w-full h-full py-4">
        <div className="flex flex-col gap-4 px-4">
          <div className="flex justify-between align-middle items-center gap-4">
            <SearchBar className="" />
            <Button>Order List</Button>
          </div>
          <CategoriesSlide
            categories={categories || []}
            onClick={(e) => setSelectedCat(e.id || "")}
            selected={selectedCat}
          />
        </div>
        <ProductList
          className="flex grow flex-col"
          products={products || []}
          onClick={onProductClick}
        />
      </div>
      <Form {...form}>
        <form
          className={clsx(
            "flex md:flex-row flex-col md:w-4/12 3xl:w-3/12 w-full duration-300 transition-all",
            {
              "h-d-screen-top-close": isTopBarHidden,
              "h-d-screen-top-open": !isTopBarHidden,
            }
          )}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <OrderContextProvider>
            <Order />
          </OrderContextProvider>
        </form>
      </Form>
    </div>
  );
}
