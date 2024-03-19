"use client";

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

export default function POS() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get("/store/categories"),
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => instance.get("/store/products"),
  });

  return (
    <div className="pos-main-grid gap-4 w-full h-full">
      <div className="md:col-span-8 col-span-12 flex flex-col gap-3 w-full h-full overflow-scroll">
        <div className="flex justify-between">
          <SearchBar className="w-auto h-auto" />
        </div>

        <CategoriesSlide
          className=""
          categories={(categories as never as any[]) || []}
        />
        <ProductList className="" products={(products as any) || []} />

        <div className="w-full h-auto flex flex-wrap">
          {new Array(10).map((e, i) => (
            <div className="text-md text-center h-40 w-1/2" key={i}>
              {i}
            </div>
          ))}
        </div>
      </div>
      <CartSummary className="md:col-span-4 col-span-12 h-full overflow-scroll" />
    </div>
  );
}
