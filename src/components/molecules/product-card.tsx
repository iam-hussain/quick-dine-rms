import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { AspectRatio } from "@/components/atoms/aspect-ratio";

function ProductCard({
  id,
  name,
  image,
  deck,
  formattedPrice,
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
}) {
  return (
    <li
      className={clsx(
        "flex flex-col h-full w-full align-middle items-center rounded-lg p-2 bg-bw cursor-pointer text-center select-none hover:text-accent-foreground hover:bg-accent/30 hover:border-accent active:border-accent-foreground border-2 border-bw",
        {
          "justify-center": !image.primary?.id,
          "justify-start": image.primary?.id,
        }
      )}
    >
      {image.primary?.id && (
        <AspectRatio ratio={5 / 3} className="h-full">
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
        <p className="text-md">{formattedPrice}</p>
      </div>
    </li>
  );
}

export default ProductCard;
