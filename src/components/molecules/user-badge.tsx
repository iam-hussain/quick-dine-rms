import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import clsx from "clsx";
import { Button } from "@/components/atoms/button";

function UserBadge({
  name,
  image,
  minimize = false,
  className,
}: {
  name: string;
  image: string;
  minimize?: Boolean;
  className?: string;
}) {
  return (
    <Button
      variant={"transparent"}
      className={clsx(
        "flex flex-row gap-2 text-right items-center align-bottom w-full p-0",
        className,
        {
          "justify-center": minimize,
          "justify-end": !minimize,
        }
      )}
    >
      {!minimize && (
        <div
          className={clsx(
            "flex flex-col text-paper-foreground justify-center align-middle items-end"
          )}
        >
          <p className="text-sm">{name}</p>
        </div>
      )}
      <Avatar className="cursor-pointer select-none bg-paper h-8 w-8">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-bw-foreground text-bw text-sm">
          {name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}

export default UserBadge;
