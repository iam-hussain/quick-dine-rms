"use client";

import { useSelector } from "react-redux";
import CategoryCollection from "@/components/organisms/category-collection";
import ProductCollection from "@/components/organisms/product-collection";
import SearchBar from "@/components/organisms/search-bar";
import { Button } from "@/components/atoms/button";
import { useMemo, useState } from "react";
import { isValidArray } from "@/lib/utils";
import { ProductAPIType } from "@/types";
import { RootState } from "@/store";
import clsx from "clsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../atoms/tabs-primary";

export default function POSExplorer({
  onItemClick,
  className,
}: {
  onItemClick: (e: any, p: ProductAPIType) => void;
  className?: string;
}) {
  const categories = useSelector((state: RootState) => state.base.categories);
  const products = useSelector((state: RootState) => state.base.products);

  const [selectedCat, setSelectedCat] = useState("");

  const categoriesData: any[] = useMemo(() => {
    if (categories && isValidArray(categories)) {
      return categories.filter((e: any) => Boolean(e.productsConnected));
    }
    return [];
  }, [categories]);

  const productsData: any[] = useMemo(() => {
    if (products && isValidArray(products)) {
      if (selectedCat) {
        return products.filter((e) => e.categoryId === selectedCat);
      } else {
        return products;
      }
    }
    return [];
  }, [products, selectedCat]);

  return (
    <Tabs
      defaultValue="products"
      className={clsx(
        "flex flex-col md:w-8/12 3xl:w-9/12 4xl:w-10/12 w-full h-full pb-4"
      )}
    >
      <div className="flex flex-col gap-4 p-4 border-b">
        <div className="flex justify-between align-middle items-center gap-4">
          <SearchBar className="" />
          <TabsList className="justify-end">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <div className="flex w-full grow h-5/6">
        <TabsContent value="products" className="flex w-full">
          <CategoryCollection
            className="border-r border-b"
            categories={categoriesData}
            onClick={(e) => setSelectedCat(e.id || "")}
            selected={selectedCat}
            productCount={products.length || 0}
          />
          <ProductCollection
            className="border-b"
            products={productsData}
            onClick={onItemClick}
          />
        </TabsContent>
        <TabsContent value="orders">Orders List</TabsContent>
      </div>
    </Tabs>
  );
}
