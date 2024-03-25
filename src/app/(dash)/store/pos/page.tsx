"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import CartSummary from "@/components/organisms/cart-summary";
import SearchBar from "@/components/organisms/search-bar";
import BrandSideBySide from "@/components/atoms/brand/side-by-side";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import { ThemeModeToggle } from "@/components/organisms/theme-mode-toggle";
import Icon from "@/components/atoms/icon";
import instance from "@/lib/instance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/atoms/button";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import schemas, { CartSchemaValues } from "@/validations";
import { Form } from "@/components/atoms/form";
import { useEffect, useState } from "react";

export default function POS() {
  const [selectedCategory, setSelectedCategory] = useState("");
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
    if (
      categoriesData &&
      Array.isArray(categoriesData) &&
      categoriesData.length
    ) {
      setCategories(
        categoriesData.filter((e) => Boolean(e.productsConnected)) as any
      );
    }
  }, [categoriesData]);

  useEffect(() => {
    if (productsData && Array.isArray(productsData) && productsData.length) {
      setProducts(productsData as any);
    }
  }, [productsData]);

  useEffect(() => {
    if (productsData && Array.isArray(productsData) && productsData.length) {
      if (selectedCategory) {
        setProducts(
          productsData.filter((e) => e.categoryId === selectedCategory)
        );
      } else {
        setProducts(productsData);
      }
    }
  }, [productsData, selectedCategory]);

  const defaultValues: Partial<CartSchemaValues> = {
    type: "EXPRESS",
  };
  const form = useForm<CartSchemaValues>({
    resolver: zodResolver(schemas.cart),
    defaultValues,
    mode: "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    setError,
  } = form;
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  const appendItem = (data: {
    price: number;
    title: string;
    note: string;
    quantity: number;
    productId: string;
  }) => {
    const index = fields.findIndex((e) => e.productId === data.productId);
    if (index >= 0) {
      update(index, { ...fields[index], quantity: fields[index].quantity + 1 });
    } else {
      append(data);
    }
  };

  return (
    <div className="flex md:flex-row flex-col w-full h-full">
      <Form {...form}>
        <form
          className="flex md:flex-row flex-col w-full h-full"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="flex flex-col md:w-8/12 w-full h-full py-4">
            <div className="flex flex-col gap-4 px-4">
              <div className="flex justify-between align-middle items-center gap-4">
                <SearchBar className="" />
                <Button>Order List</Button>
              </div>
              <CategoriesSlide
                categories={categories || []}
                onEachClick={(e) => setSelectedCategory(e.shortId || "")}
                selectedCategory={selectedCategory}
              />
            </div>
            <ProductList
              className="flex grow flex-col"
              products={products || []}
              append={appendItem}
            />
          </div>
          <CartSummary
            className="flex flex-col gap-1 md:w-4/12 w-full h-full py-4 md:py-2 px-1 bg-background"
            fields={fields}
            register={register}
            remove={remove}
            control={control}
            setValue={setValue}
            update={update}
          />
        </form>
      </Form>
    </div>
  );
}
