import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";

function UserBadge({
  firstName,
  lastName,
  image,
  minimize = false,
  className,
}: {
  firstName: string;
  lastName?: string;
  image: string;
  minimize?: boolean;
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
        "flex flex-col text-right items-center align-bottom w-full px-4",
        className,
        {
          "justify-center": minimize,
          "justify-end": !minimize,
        }
      )}
    >
      <div className="flex justify-center align-middle items-center gap-2 py-2">
        <motion.div
          whileHover="hover"
          whileTap="pressed"
          variants={buttonVariants}
        >
          <Avatar className="cursor-pointer select-none bg-paper h-8 w-8">
            <AvatarImage src={image} alt={firstName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {firstName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        <p className="text-base font-medium text-foreground/80">{`${firstName}${lastName ? ` ${lastName}` : ""}`}</p>
      </div>
      {/* <motion.div
        whileHover="hover"
        whileTap="pressed"
        variants={buttonVariants}
      >
        <Button variant={"outline"} className="flex gap-2">
          <Icon name={"IoLogOut"} className="h-5 w-5" />
          Logout
        </Button>
      </motion.div> */}
    </div>
  );
}

export default UserBadge;
