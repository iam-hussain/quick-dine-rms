"use client";

import { Container } from "@/components/atoms/container";
import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import { useFullScreenHandle, FullScreen } from "react-full-screen";
import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import CartSummary from "@/components/organisms/cart-summary";
import SearchBar from "@/components/organisms/search-bar";
import BrandSideBySide from "@/components/atoms/brand/side-by-side";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import { ThemeModeToggle } from "@/components/organisms/theme-mode-toggle";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";

export default function Mobile({ children }: { children: React.ReactNode }) {
  return (
    <Container
      variant={"screen"}
      className="flex justify-start align-middle items-center flex-col pb-4 gap-2"
    >
      <div className="flex justify-between align-middle items-center px-4 py-2 bg-paper w-full min-h-[64px] mb-4">
        <BrandSideBySide className="col-span-2" />
        <ThemeModeToggle className="md:col-start-12 row-start-1 col-span-1 col-start-6" />
      </div>
      {children}
      <div className="w-full min-h-10 fixed bottom-0 left-0 right-0 py-3 bg-secondary bg text-secondary-foreground flex justify-center align-middle items-center gap-6">
        <Button variant={"ghost"} className="h-auto">
          <Icon name="FaStore" className="h-6 w-6" />
        </Button>
        <Button variant={"ghost"} className="h-auto">
          <Icon name="SiAirtable" className="h-6 w-6" />
        </Button>
        <Button variant={"ghost"} className="h-auto">
          <Icon name="FaShoppingCart" className="h-6 w-6" />
        </Button>
        <Button variant={"ghost"} className="h-auto">
          <Icon name="FaUser" className="h-6 w-6" />
        </Button>
      </div>
    </Container>
  );
}
