import React, { AnimationEventHandler } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { ProductAPI } from "@/types";

const animateVariation = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.9 },
};

export interface ProductCardProps {
  product: ProductAPI;
  onClick: () => void;
}

function ProductCard({ product, ...props }: ProductCardProps) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="pressed"
      variants={animateVariation}
      className={clsx(
        "flex flex-row md:flex-col h-full w-full align-middle items-center rounded-lg p-2 md:p-4 bg-background cursor-pointer text-center select-none",
        {
          "justify-center": !product?.image.primary?.id,
          "justify-start": product?.image.primary?.id,
        }
      )}
      {...props}
    >
      {product?.image.primary?.id && (
        <div className="w-5/12 md:w-full rounded-lg">
          <AspectRatio ratio={4 / 3} className="h-full">
            <Image
              src={product?.image.primary?.content}
              alt={product?.image.primary?.altText}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      )}
      <div className="w-full flex h-full justify-center text-right md:text-center flex-col px-2 md:px-0">
        <h5 className="text-sm md:text-base font-semibold text-foreground">
          {product?.name || ""}
        </h5>
        {product?.deck && (
          <p className="text-sm text-one-line md:hidden">{product?.deck}</p>
        )}
        <p className="text-sm md:text-md font-medium text-primary">
          {product?.formattedPrice}
        </p>
      </div>
    </motion.div>
  );
}

export default ProductCard;
