import React from "react";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import ProductCard from "@/components/molecules/product-card";
import { Container } from "@/components/atoms/container";
import clsx from "clsx";
import { ProductAPI } from "@/types";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { CartSchemaValues } from "@/validations";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";

function ProductList({
  className,
  products,
  control,
}: {
  className?: string;
  products: ProductAPI[];
  control: Control<OrderUpsertSchemaType>;
}) {
  const { append, update } = useFieldArray({
    control,
    name: "items",
  });
  const items = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

  const handleOnClick = (product: ProductAPI) => {
    const index = items.findIndex((e) => e.productId === product.id);
    if (index >= 0) {
      update(index, { ...items[index], quantity: items[index].quantity + 1 });
    } else {
      append({
        price: product.price,
        title: product.name,
        note: "",
        quantity: 1,
        position: items.length + 1,
        productId: product.id,
        type: product.type,
      });
    }
  };

  return (
    <ScrollArea className={clsx("w-full h-full", className)}>
      <Container className="grid xl:grid-cols-5 md:grid-cols-3 px-4 py-2 grid-cols-1 gap-4 place-items-stretch place-content-around">
        {products.map((product, index) => (
          <ProductCard
            product={product}
            key={index}
            onClick={() => handleOnClick(product)}
          />
        ))}
      </Container>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ProductList;
