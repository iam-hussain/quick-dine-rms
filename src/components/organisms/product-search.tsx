"use client";

import { useSelector } from "react-redux";
import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import SearchBar from "@/components/organisms/search-bar";
import { Button } from "@/components/atoms/button";
import { useMemo, useState } from "react";
import { isValidArray } from "@/lib/utils";
import { ProductAPI } from "@/types";
import { RootState } from "@/store";
import clsx from "clsx";

export default function ProductSearch({
  onItemClick,
  className,
}: {
  onItemClick: (e: any, p: ProductAPI) => void;
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
    <div
      className={clsx(
        "flex flex-col md:w-8/12 3xl:w-9/12 4xl:w-10/12 w-full h-full pb-4",
        className
      )}
    >
      <div className="flex flex-col gap-4 p-4 border-b">
        <div className="flex justify-between align-middle items-center gap-4">
          <SearchBar className="" />
          <Button>Order List</Button>
        </div>
      </div>
      <div className="flex w-full grow h-5/6">
        <CategoriesSlide
          className="border-r border-b"
          categories={categoriesData}
          onClick={(e) => setSelectedCat(e.id || "")}
          selected={selectedCat}
          totalItems={products.length || 0}
        />
        <ProductList
          className="border-b"
          products={productsData}
          onClick={onItemClick}
        />
      </div>
    </div>
  );
}
