import clsx from "clsx";
import React from "react";

import { Container } from "@/components/atoms/container";
import ProductItem from "@/components/molecules/product-item";
import { ProductAPIType } from "@/types";

function ProductCollection({
  className,
  products,
  onClick,
}: {
  className?: string;
  products: ProductAPIType[];
  onClick: (e: any, p: ProductAPIType) => void;
}) {
  return (
    <div className={clsx("flex w-full h-auto gap-2 flex-col grow", className)}>
      {/* <h1 className="text-xl font-medium">Products</h1> */}

      <Container className="grid md:grid-cols-3 2xl:grid-cols-4 px-4 grid-cols-1 gap-4 place-items-stretch place-content-around w-full m-auto">
        {products.map((product, index) => (
          <ProductItem product={product} key={index} onClick={onClick} />
        ))}
      </Container>
    </div>
  );
}

export default ProductCollection;
