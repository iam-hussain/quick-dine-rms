import React, { AnimationEventHandler } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { ProductAPI } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const animateVariation = {
  initial: { scale: 1 },
  hover: { scale: 1.03 },
  pressed: { scale: 0.95 },
};

export interface ProductCardProps {
  product: ProductAPI;
  onClick: (e: any, p: ProductAPI) => void;
}

function ProductCard({ product, onClick, ...props }: ProductCardProps) {
  const featureFlags = useSelector(
    (state: RootState) => state.base.featureFlags
  );

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="pressed"
      variants={animateVariation}
      className={clsx(
        "flex flex-col h-full w-full align-middle items-center justify-start text-start rounded-lg cursor-pointer select-none gap-2 transition duration-300 active:scale-95",
        {
          "bg-paper p-4 hover:bg-accent": !featureFlags.showProductsImage,
          // "bg-paper p-4 hover:scale-": featureFlags.showProductsImage,
        }
      )}
      onClick={(e) => onClick(e, product)}
      {...props}
    >
      {featureFlags.showProductsImage && product?.image.primary?.value && (
        <div className="w-full rounded-lg border-2 border-accent">
          <AspectRatio ratio={5 / 3} className="h-full">
            <Image
              src={product?.image.primary?.value}
              alt={product?.image.primary?.value}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      )}
      {featureFlags.showProductsImage && !product?.image.primary?.value && (
        <div className="w-5/12 rounded-lg border-2 border-accent">
          <AspectRatio ratio={4 / 3} className="h-full">
            <div className="flex justify-center align-middle items-center rounded-md object-cover h-full w-full bg-accent text-2xl font-bold">
              H
            </div>
          </AspectRatio>
        </div>
      )}

      <div
        className={clsx("flex-col w-full", {
          // "text-left w-7/12": featureFlags.showProductsImage,
          // "text-center w-full": !featureFlags.showProductsImage,
        })}
      >
        <h5
          className={clsx("text-base text-foreground", {
            "break-words text-one-line": featureFlags.showProductsImage,
          })}
        >
          {product?.name || ""}
        </h5>
        {/* {featureFlags.showProductsImage && product?.deck && (
          <p className="text-sm truncate overflow-hidden">{product?.deck}</p>
        )} */}
        <p className="font-semibold text-xl text-foreground">
          {product?.formattedPrice}
        </p>
      </div>
    </motion.div>
  );
}

export default ProductCard;
