"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import CartSummary from "@/components/organisms/cart-summary";
import SearchBar from "@/components/organisms/search-bar";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/atoms/button";
import { useForm, useWatch } from "react-hook-form";
import schemas, { CartSchemaValues, ORDER_TYPE } from "@/validations";
import { Form } from "@/components/atoms/form";
import { useEffect, useState } from "react";
import { isValidArray } from "@/lib/utils";
import { useStoreStore } from "@/stores/storeSlice";
import { StoreAdditionalType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";

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
    type: ORDER_TYPE.PICK_UP,
    items: [],
    fees: [],
    taxes: taxes
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
    mutationFn: (variables) => instance.get(`/store/order/${variables.shortId}`),
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
      fetchOrder.mutate({ shortId: id })
    }
  }, [fetchOrder, id, order]);


  const mutation = useMutation({
    mutationFn: (variables) => instance.post("/store/order", variables),
    onSuccess: async (data: any) =>  {  fetchOrder.mutate({ shortId: data.shortId }); setValue("items", []);} ,
    onError: console.error,
  });

  async function onSubmit({table,  ...variables}: OrderUpsertSchemaType) {
    console.log({ variables });
    
    return await mutation.mutateAsync({
      ...variables,
      ...(table?.key ? { table }: {})
    } as any);
  }

  return (
    <div className="flex md:flex-row flex-col w-full h-full">
      <div className="flex flex-col md:w-8/12 w-full h-full py-4">
        <div className="flex flex-col gap-4 px-4">
          <div className="flex justify-between align-middle items-center gap-4">
            <SearchBar className="" />
            <Button>Order List</Button>
          </div>
          <CategoriesSlide
            categories={categories || []}
            onItemClick={(e) => setSelectedCat(e.id || "")}
            selected={selectedCat}
          />
        </div>
        <ProductList
          className="flex grow flex-col"
          products={products || []}
          control={control}
        />
      </div>
      <Form {...form}>
        <form
          className="flex md:flex-row flex-col md:w-4/12 w-full h-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CartSummary
            className="flex flex-col gap-1 w-full h-full py-4 md:py-2 px-1 bg-background"
            control={control}
            order={order}
          />
        </form>
      </Form>
    </div>
  );
}
