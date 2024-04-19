import React from "react";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import ProductCard from "@/components/molecules/product-card";
import { Container } from "@/components/atoms/container";
import clsx from "clsx";
import { ProductAPI } from "@/types";

function ProductList({
  className,
  products,
  onClick,
}: {
  className?: string;
  products: ProductAPI[];
  onClick: (e: any, p: ProductAPI) => void
}) {
  return (
    <ScrollArea className={clsx("w-full h-full", className)}>
      <Container className="grid 2xl:grid-cols-4 md:grid-cols-3 px-4 py-2 grid-cols-1 gap-4 place-items-stretch place-content-around">
        {products.map((product, index) => (
          <ProductCard
            product={product}
            key={index}
            onClick={onClick}
          />
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ProductList;
