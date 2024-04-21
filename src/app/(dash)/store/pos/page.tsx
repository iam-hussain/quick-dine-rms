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
import schemas, {  ORDER_TYPE } from "@/validations";
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

export default function POS() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [selectedCat, setSelectedCat] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const { taxes } = useStoreStore(
    (state: { settings: StoreAdditionalType }) => state.settings
  );

  const { enableTables, enableCustomerAdding } = useStoreStore(
    (state) => state.featureFlags
  );
  const isTopBarHidden = useActionStore((state) => state.isTopBarHidden);

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

  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  const fetchOrder = useMutation({
    mutationFn: (variables) =>
      instance.get(`/store/order/${variables.shortId}`),
    onSuccess: async (data: any) => {
      history.pushState({}, "", `/store/pos?id=${data.shortId}`);
      setOrder(data as any);
      setValue("shortId", data.shortId);

      setValue("shortId", data.shortId);
      setValue("type", data.type);
      setValue("status", data.status);
      // setValue("note", e.note);
      // setValue("customerId", e.customerId);
      // setValue("completedAt", e.completedAt);
      // setValue("deliveredAt", e.deliveredAt);
      setValue("fees", data.fees);
      setValue("table", data.table);
      setValue("taxes", data.taxes);
    },
    onError: console.error,
  });

  useEffect(() => {
    if (id && !order?.shortId) {
      fetchOrder.mutate({ shortId: id });
    }
  }, [fetchOrder, id, order]);

  const { append, update } = useFieldArray({
    control,
    name: "items",
  });
  const items = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

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

  const mutation = useMutation({
    mutationFn: (variables) => instance.post("/store/order", variables),
    onSuccess: async (data: any) => {
      fetchOrder.mutate({ shortId: data.shortId });
      setValue("items", []);
    },
    onError: console.error,
  });

  async function onSubmit({ table, ...variables }: OrderUpsertSchemaType) {
    console.log({ variables });

    return await mutation.mutateAsync({
      ...variables,
      ...(enableTables && table?.key ? { table } : {}),
      ...(enableCustomerAdding ? {} : {}),
    } as any);
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
          <Order
            control={control}
            order={order}
          />
        </form>
      </Form>
    </div>
  );
}
