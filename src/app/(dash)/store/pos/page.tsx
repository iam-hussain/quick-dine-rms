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
    <div className="flex justify-start align-top items-start gap-4 w-full h-auto">
      <div className="flex flex-col gap-3 w-8/12 h-full overflow-scroll">
        <div className="flex justify-between">
          <SearchBar className="w-auto h-auto" />
        </div>

        <CategoriesSlide
          className=""
          categories={(categories as never as any[]) || []}
        />
        <ProductList className="" products={(products as any) || []} />
      </div>
      <CartSummary className="w-4/12 h-full overflow-scroll" />
    </div>
  );
}
