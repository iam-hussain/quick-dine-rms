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
        "flex flex-col h-full w-full align-middle items-center rounded-lg p-4 bg-background cursor-pointer text-center select-none",
        {
          "justify-center": !product?.image.primary?.id,
          "justify-start": product?.image.primary?.id,
        }
      )}
      {...props}
    >
      {product?.image.primary?.id && (
        <AspectRatio ratio={4 / 3} className="h-full">
          <Image
            src={product?.image.primary?.content}
            alt={product?.image.primary?.altText}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      )}
      <div className="w-full flex h-full justify-center align-middle items-center flex-col">
        <h5 className="text-base font-semibold text-foreground">
          {product?.name || ""}
        </h5>
        {/* {deck && <p className="text-sm text-one-line">{deck}</p>} */}
        <p className="text-md font-medium text-primary">
          {product?.formattedPrice}
        </p>
      </div>
    </motion.div>
  );
}

export default ProductCard;
