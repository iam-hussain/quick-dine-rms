"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import CartSummary from "@/components/organisms/cart-summary";
import SearchBar from "@/components/organisms/search-bar";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/atoms/button";
import { useForm } from "react-hook-form";
import schemas, { CartSchemaValues, OrderType } from "@/validations";
import { Form } from "@/components/atoms/form";
import { useEffect, useState } from "react";
import { isValidArray } from "@/lib/utils";

export default function POS() {
  const [selectedCat, setSelectedCat] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

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

  const defaultValues: Partial<CartSchemaValues> = {
    type: OrderType.PICK_UP,
  };

  const form = useForm<CartSchemaValues>({
    resolver: zodResolver(schemas.cart),
    defaultValues,
    mode: "onSubmit",
  });

  const { control, handleSubmit } = form;

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
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <CartSummary
            className="flex flex-col gap-1 w-full h-full py-4 md:py-2 px-1 bg-background"
            control={control}
          />
        </form>
      </Form>
    </div>
  );
}
