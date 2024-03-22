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
import { Button } from "@/components/atoms/button";

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
    <div className="flex w-full h-full">
      <div className="flex flex-col gap-2 md:w-8/12 w-full h-full py-4 px-2">
        <div className="flex flex-col gap-3 px-4">
          <div className="flex justify-between">
            <SearchBar className="" />
            <div className="gap-2 flex">
              <Button className="flex gap-2" variant={"accent"}>
                <Icon className="h-5 w-5" name="IoMdAdd" />
                New Order
              </Button>
              <Button variant={"outline"}>Order List</Button>
            </div>
          </div>
          <CategoriesSlide categories={(categories as never as any[]) || []} />
        </div>
        <ProductList
          className="flex grow flex-col px-4"
          products={(products as any) || []}
        />
      </div>
      <CartSummary className="flex flex-col gap-1 md:w-4/12 w-full h-full py-4 px-2" />
    </div>
  );
}
