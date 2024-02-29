import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import clsx from "clsx";
import { motion } from "framer-motion";

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
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    pressed: { scale: 0.9 },
  };

  return (
    <div
      className={clsx(
        "flex flex-col text-right items-center align-bottom w-full p-0 py-4 bg-paper/30",
        className,
        {
          "justify-center": minimize,
          "justify-end": !minimize,
        }
      )}
    >
      <motion.div
        whileHover="hover"
        whileTap="pressed"
        variants={buttonVariants}
      >
        <Avatar className="cursor-pointer select-none bg-paper h-8 w-8">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </motion.div>
      <p className="text-base mb-4 font-medium text-foreground/80">{name}</p>
      <motion.div
        whileHover="hover"
        whileTap="pressed"
        variants={buttonVariants}
      >
        <Button variant={"outline"} className="flex gap-2">
          <Icon name={"IoLogOut"} className="h-5 w-5" />
          Logout
        </Button>
      </motion.div>
    </div>
  );
}

export default UserBadge;
