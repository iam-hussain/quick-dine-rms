import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { AspectRatio } from "@/components/atoms/aspect-ratio";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/atoms/button";

function CategoryCard({
  name,
  active = false,
  onClick,
  className,
}: {
  name: string;
  active?: Boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-none border-t-4 z-10 text-sm text-center font-medium px-4 py-2 cursor-pointer",
        className,
        {
          "border-primary": active,
          "border-transparent": !active,
        }
      )}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default CategoryCard;
