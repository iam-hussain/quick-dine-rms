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
    <div className="flex flex-col justify-start align-top items-start gap-4 w-full h-auto">
      {/* <div className="pos-list-grid bg-paper w-full h-full md:row-span-full row-start-1 md:col-span-8 col-span-12 gap-y-4 py-4"> */}
      {/* <div className="row-start-1 mx-4 grid grid-cols-6 md:grid-cols-12 gap-2 select-none place-content-around gap-y-4">
          <BrandSideBySide className="col-span-2" />
          <SearchBar className="w-auto md:col-span-7 md:col-start-5 md:row-start-1 row-start-2 col-span-full" />
          <ThemeModeToggle className="md:col-start-12 row-start-1 col-span-1 col-start-6" />
        </div> */}

      <CategoriesSlide
        className=""
        categories={(categories as never as any[]) || []}
      />
      <ProductList className="" products={(products as any) || []} />
      {/* </div> */}
      <CartSummary className="" />
    </div>
  );
}
