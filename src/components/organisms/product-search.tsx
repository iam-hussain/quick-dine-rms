"use client";

import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import SearchBar from "@/components/organisms/search-bar";
import { Button } from "@/components/atoms/button";
import { useMemo, useState } from "react";
import { isValidArray } from "@/lib/utils";
import { ProductAPI } from "@/types";

export default function ProductSearch({
  categories,
  products,
  onProductClick,
}: {
  categories: any[];
  products: any[];
  onProductClick: (e: any, p: ProductAPI) => void;
}) {
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
    <div className="flex flex-col md:w-8/12 3xl:w-9/12 w-full h-full py-4">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex justify-between align-middle items-center gap-4">
          <SearchBar className="" />
          <Button>Order List</Button>
        </div>
        <CategoriesSlide
          categories={categoriesData}
          onClick={(e) => setSelectedCat(e.id || "")}
          selected={selectedCat}
        />
      </div>
      <ProductList
        className="flex grow flex-col"
        products={productsData}
        onClick={onProductClick}
      />
    </div>
  );
}
