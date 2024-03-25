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
    <li
      className={clsx(
        "flex flex-col h-full w-full align-middle items-center rounded-lg p-4 bg-bw cursor-pointer text-center select-none hover-hover:border-secondary active-hover:border-accent-foreground border-2 border-bw",
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
    </li>
  );
}

export default ProductCard;
