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
        "flex flex-row h-full w-full align-middle items-center rounded-lg p-3 bg-background cursor-pointer text-center select-none gap-2 border border-accent ",
        {
          "justify-center": !product?.image.primary?.value,
          "justify-start": product?.image.primary?.value,
        }
      )}
      {...props}
    >
      {product?.image.primary?.value && (
        <div className="w-5/12 rounded-lg">
          <AspectRatio ratio={4 / 3} className="h-full">
            <Image
              src={product?.image.primary?.value}
              alt={product?.image.primary?.value}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      )}
      {!product?.image.primary?.value && (
        <div className="w-5/12 rounded-lg">
          <AspectRatio ratio={4 / 3} className="h-full">
            <div className="flex justify-center align-middle items-center rounded-md object-cover h-full w-full bg-accent text-2xl font-bold">
              H
            </div>
          </AspectRatio>
        </div>
      )}

      <div
        className={clsx("flex-col", {
          "text-left w-7/12": product?.image.primary?.value,
          "text-center w-full": !product?.image.primary?.value,
        })}
      >
        <h5 className="text-sm md:text-base break-words font-semibold text-foreground text-one-line">
          {product?.name || ""}
        </h5>
        {product?.deck && (
          <p className="text-sm truncate overflow-hidden">{product?.deck}</p>
        )}
        <p className="text-sm md:text-md font-medium text-primary">
          {product?.formattedPrice}
        </p>
      </div>
    </motion.div>
  );
}

export default ProductCard;
