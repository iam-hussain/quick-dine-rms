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
    <Button onClick={onClick} variant={active ? "secondary" : "transparent"}>
      {name}
    </Button>
  );
}

export default CategoryCard;
