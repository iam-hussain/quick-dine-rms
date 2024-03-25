import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/atoms/aspect-ratio";

const animateVariation = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.9 },
};

function ProductCard({
  id,
  name,
  image,
  deck,
  formattedPrice,
  onClick,
}: {
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
  onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
}) {
  return (
    <motion.li
      initial="initial"
      whileHover="hover"
      whileTap="pressed"
      variants={animateVariation}
      className={clsx(
        "flex flex-col h-full w-full align-middle items-center rounded-lg p-4 bg-background cursor-pointer text-center select-none",
        {
          "justify-center": !image.primary?.id,
          "justify-start": image.primary?.id,
        }
      )}
      onClick={onClick}
    >
      {image.primary?.id && (
        <AspectRatio ratio={4 / 3} className="h-full">
          <Image
            src={image.primary.content}
            alt={image.primary.altText}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      )}
      <div className="w-full flex h-full justify-center align-middle items-center flex-col">
        <h5 className="text-base font-semibold text-foreground">
          {name || ""}
        </h5>
        {/* {deck && <p className="text-sm text-one-line">{deck}</p>} */}
        <p className="text-md font-medium text-primary">{formattedPrice}</p>
      </div>
    </motion.li>
  );
}

export default ProductCard;
