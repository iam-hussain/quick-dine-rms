import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import CartSummary from "@/components/organisms/cart-summary";
import SearchBar from "@/components/organisms/search-bar";
import BrandSideBySide from "@/components/atoms/brand/side-by-side";
import ButtonToolTip from "@/components/molecules/button-tooltip";
import { ThemeModeToggle } from "@/components/organisms/theme-mode-toggle";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";

export default function Table() {
  return (
    <section className="flex justify-start align-middle items-center flex-col w-full px-4 pb-[90px] max-w-xl">
      <div className="flex justify-between align-middle items-center w-full">
        <h1 className="text-lg">Tables</h1>
        <Button className="h-auto">
          <Icon name="MdAdd" className="h-6 w-6" />
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 w-full gap-4">
        {new Array(10).fill(1).map((e, i) => (
          <div key={i} className="bg-paper min-h-36">
            <h1>{i + 1}</h1>
          </div>
        ))} 
      </div>
    </section>
  );
}
