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
import OrderCollection from "./order-collection";
import usePOSCart from "@/hooks/usePOSCart";

export default function POSExplorer({
  onItemClick,
  onNewOrderClick,
  className,
}: {
  onItemClick: (e: any, p: ProductAPIType) => void;
  onNewOrderClick: () => void;
  className?: string;
}) {
  const [tabValue, setTabValue] = useState("products");
  const categories = useSelector((state: RootState) => state.base.categories);
  const products = useSelector((state: RootState) => state.base.products);
  const { fetch } = usePOSCart();
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

  const handleNewOrderClick = () => {
    onNewOrderClick();
    setTabValue("products");
  };

  return (
    <Tabs
      defaultValue="products"
      value={tabValue}
      onValueChange={setTabValue}
      className={clsx(
        "flex flex-col md:w-8/12 3xl:w-9/12 4xl:w-10/12 w-full h-full pb-4"
      )}
    >
      <div className="flex flex-col gap-4 p-4 border-b w-full">
        <div className="flex justify-between align-middle items-center gap-4">
          <div className="justify-start flex gap-4">
            <SearchBar className="" />
            <Button variant={"secondary"} onClick={() => handleNewOrderClick()}>
              New Order
            </Button>
          </div>
          <TabsList className="justify-end">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <div className="flex w-full grow h-5/6">
        <TabsContent value="products" className=" grow w-full">
          <div className="flex">
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
          </div>
        </TabsContent>
        <TabsContent value="orders" className=" grow w-full">
          <OrderCollection onItemClick={fetch} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
