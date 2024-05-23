import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

const animateVariation = {
  initial: { scale: 1 },
  hover: { scale: 1.03 },
  pressed: { scale: 0.95 },
};

function CategoryItem({
  name,
  active = false,
  onClick,
  className,
  numberOfItems,
}: {
  name: string;
  active?: Boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  numberOfItems: number;
}) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="pressed"
      variants={animateVariation}
      className={clsx(
        "rounded-md z-10 text-sm text-left font-medium p-4 border-2 cursor-pointer w-[140px] transition duration-300",
        className,
        {
          "border-primary bg-primary text-primary-foreground": active,
          "border-paper hover:bg-paper transition duration-300": !active,
        }
      )}
      onClick={onClick}
    >
      <div>
        <p className="text-sm">{name}</p>
        <p
          className={clsx("text-md", {
            "text-primary-foreground/70": active,
            "text-foreground/70": !active,
          })}
        >
          {numberOfItems} Items
        </p>
      </div>
    </motion.div>
  );
}

export default CategoryItem;
