"use client";

import clsx from "clsx";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/atoms/button";
import CategoryCollection from "@/components/organisms/category-collection";
import ProductCollection from "@/components/organisms/product-collection";
import SearchBar from "@/components/organisms/search-bar";
import { isValidArray } from "@/lib/utils";
import { RootState } from "@/store";
import { ProductAPIType } from "@/types";

import { ScrollArea } from "../atoms/scroll-area";
import RecentOrdersProvider from "../templates/recent-orders-provider";
import RecentOrderCollection from "./recent-order-collection";

export default function POSExplorer({
  onItemClick,
  onNewOrderClick,
}: {
  onItemClick: (e: any, p: ProductAPIType) => void;
  onNewOrderClick: () => void;
  className?: string;
}) {
  const categories = useSelector((state: RootState) => state.base.categories);
  const products = useSelector((state: RootState) => state.base.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    _.debounce((searchQuery) => {
      if (searchQuery) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }, 500),
    [products]
  );

  const categoriesData: any[] = useMemo(() => {
    if (categories && isValidArray(categories)) {
      return categories.filter((e: any) => Boolean(e.productsConnected));
    }
    return [];
  }, [categories]);

  const productsData: any[] = useMemo(() => {
    const actualProducts =
      Array.isArray(filteredProducts) && filteredProducts?.length
        ? filteredProducts
        : products;

    if (selectedCategory) {
      return actualProducts.filter((e) => e.categoryId === selectedCategory);
    } else {
      return actualProducts;
    }
  }, [filteredProducts, products, selectedCategory]);

  return (
    <div className={clsx("flex flex-col w-auto h-full grow")}>
      <div className="flex flex-col gap-4 p-4 border-b w-full">
        <div className="flex justify-between align-middle items-center gap-4">
          <div className="justify-start flex gap-4">
            <SearchBar onChange={handleSearch} />
          </div>
          <div className="flex gap-4">
            <RecentOrdersProvider>
              <RecentOrderCollection />
            </RecentOrdersProvider>{" "}
            <Button variant={"secondary"} onClick={() => onNewOrderClick()}>
              New Order
            </Button>
          </div>
        </div>
      </div>
      <div className="pl-2 py-6 bg-background flex grow h-5/6 ">
        <div className="flex h-full w-full px-2">
          <ScrollArea className={clsx("w-auto h-full pr-4")}>
            <CategoryCollection
              className="min-w-[175px]"
              categories={categoriesData}
              onClick={(e) => setSelectedCategory(e.id || "")}
              selected={selectedCategory}
              productCount={products.length || 0}
            />
          </ScrollArea>
          <ScrollArea className={clsx("w-full h-full pr-2")}>
            <ProductCollection products={productsData} onClick={onItemClick} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
