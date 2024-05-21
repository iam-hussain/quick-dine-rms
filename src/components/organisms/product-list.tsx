import React from "react";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import ProductCard from "@/components/molecules/product-card";
import { Container } from "@/components/atoms/container";
import clsx from "clsx";
import { ProductAPIType } from "@/types";

function ProductList({
  className,
  products,
  onClick,
}: {
  className?: string;
  products: ProductAPIType[];
  onClick: (e: any, p: ProductAPIType) => void;
}) {
  return (
    <div
      className={clsx("flex w-full h-auto gap-2 flex-col pl-4 py-2", className)}
    >
      {/* <h1 className="text-xl font-medium">Products</h1> */}
      <ScrollArea className={clsx("w-full h-full pr-4")}>
        <Container className="grid md:grid-cols-3 2xl:grid-cols-4 px-4 py-2 grid-cols-1 gap-4 place-items-stretch place-content-around">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} onClick={onClick} />
          ))}
        </Container>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default ProductList;
