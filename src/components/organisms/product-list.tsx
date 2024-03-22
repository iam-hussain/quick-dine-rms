import React from "react";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import ProductCard from "@/components/molecules/product-card";
import { Container } from "@/components/atoms/container";
import clsx from "clsx";
import { LargeNumberLike } from "crypto";
import { UseFieldArrayAppend } from "react-hook-form";

function ProductList({
  className,
  products,
  append,
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
  append: (data: {
    price: number;
    title: string;
    note: string;
    quantity: number;
    productId: string;
  }) => void;
}) {
  return (
    <ScrollArea className={clsx("w-full h-full", className)}>
      <Container className="grid md:grid-cols-5 grid-cols-2 gap-4 place-items-stretch place-content-around">
        {products.map((product, index) => (
          <ul key={index} className="shrink-0">
            <ProductCard
              {...product}
              onClick={() =>
                append({
                  price: product.price,
                  title: product.name,
                  note: "",
                  quantity: 1,
                  productId: product.id,
                })
              }
            />
          </ul>
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ProductList;
