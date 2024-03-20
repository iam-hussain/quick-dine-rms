import React from "react";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import ProductCard from "@/components/molecules/product-card";
import { Container } from "@/components/atoms/container";
import clsx from "clsx";
import { LargeNumberLike } from "crypto";

function ProductList({
  className,
  products,
}: {
  className?: string;
  products: {
    id: string;
    shortId: string;
    name: string;
    deck?: string;
    price: number;
    formattedPrice: string;
    foodType: string;
    type: string;
    categoryName: string;
    categoryId: string;
    image: {
      primary: {
        id: string;
        shortId: string;
        caption: string;
        altText: string;
        content: string;
        type: string;
      } | null;
    };
  }[];
}) {
  return (
    <ScrollArea className={clsx("w-full h-full bg-paper", className)}>
      <Container className="grid md:grid-cols-5 grid-cols-2 gap-4 place-items-stretch place-content-around">
        {[
          ...products,
          ...products,
          ...products,
          ...products,
          ...products,
          ...products,
          ...products,
        ].map((product, index) => (
          <div key={index} className="shrink-0">
            <ProductCard {...product} />
          </div>
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ProductList;
