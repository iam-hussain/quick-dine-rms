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
}: {
  name: string;
  active?: Boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button
      className={clsx("rounded-none border-t-2 grow", {
        "border-secondary": active,
        "border-accent": !active,
      })}
      onClick={onClick}
      variant={active ? "transparent" : "transparent"}
    >
      {name}
    </Button>
  );
}

export default CategoryCard;
