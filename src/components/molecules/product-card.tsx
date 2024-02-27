import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { AspectRatio } from "@/components/atoms/aspect-ratio";

function ProductCard({
  id,
  name,
  image,
  deck,
  price,
  active = false,
}: {
  id?: string;
  name: string;
  image?: string;
  deck?: string;
  price?: string;
  active?: Boolean;
}) {
  return (
    <button
      className={clsx(
        "flex flex-col h-full w-full align-middle items-center rounded-lg p-2 bg-bw cursor-pointer text-center select-none hover:text-accent-foreground hover:border-accent-foreground/50 hover:bg-accent active:border-bw-foreground border-2",
        {
          "justify-center": !image,
          "justify-start": image,
        }
      )}
    >
      {image && (
        <AspectRatio ratio={4 / 3} className="h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      )}
      <h5 className="text-base font-semibold">{name || ""}</h5>
      <p className="text-sm text-one-line">{deck || ""}</p>
      <p className="text-sm">{price || "20 ₹"}</p>
    </button>
  );
}

export default ProductCard;
