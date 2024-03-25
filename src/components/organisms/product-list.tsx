import React from "react";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import ProductCard from "@/components/molecules/product-card";
import { Container } from "@/components/atoms/container";
import clsx from "clsx";
import { CartItemType, ProductAPI } from "@/types";

function ProductList({
  className,
  products,
  append,
}: {
  className?: string;
  products: ProductAPI[];
  append: (data: CartItemType) => void;
}) {
  return (
    <ScrollArea className={clsx("w-full h-full", className)}>
      <Container className="grid md:grid-cols-3 px-4 py-2 grid-cols-1 gap-4 place-items-stretch place-content-around">
        {products.map((product, index) => (
          <ProductCard
            product={product}
            key={index}
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
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ProductList;
