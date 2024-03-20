import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { AspectRatio } from "@/components/atoms/aspect-ratio";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/atoms/button";

function CategoryCard({
  name,
  active = false,
}: {
  name: string;
  active?: Boolean;
}) {
  return (
    <div className="flex bg-bw rounded-lg h-full w-full justify-start align-middle items-center gap-2 select-none">
      <Button variant={active ? "secondary" : "outline"}>{name}</Button>
    </div>
  );
}

export default CategoryCard;
