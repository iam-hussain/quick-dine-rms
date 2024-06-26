import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "@tanstack/react-router";
import React from "react";
import { useMedia } from "react-use";

import Icon, { IconKey } from "@/components/atoms/icon";

function MenuItem({
  icon,
  label,
  minimize,
  link,
  onRedirect,
}: {
  icon: IconKey;
  label: string;
  minimize?: boolean;
  link?: string;
  onRedirect?: () => void;
}) {
  const isSmallDevice = useMedia("(max-width: 767px)", false);

  const fader = {
    hide: {
      opacity: 0,
      scale: 0,
    },
    show: {
      opacity: 1,
      scale: 1,
    },
  };
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        "h-9",
        "inline-flex items-center whitespace-nowrap rounded-md text-sm uppercase font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "flex gap-4 hover:bg-paper hover:text-foreground align-middle items-center font-medium",
        {
          "text-primary bg-paper/70 font-semibold": link === pathname,
          "text-foreground/70 text-sm": link !== pathname,
          "justify-center p-2": !isSmallDevice && minimize,
          "justify-start px-4 py-2": !minimize,
        }
      )}
      onClick={onRedirect}
      href={link || "#"}
    >
      <Icon name={icon} className="h-7 w-7" />
      <motion.div
        transition={{ ease: "circInOut" }}
        initial="hide"
        animate={minimize && !isSmallDevice ? "hide" : "show"}
        variants={fader}
        className={clsx({
          hidden: minimize,
        })}
      >
        {label}
      </motion.div>
    </Link>
  );
}

export default MenuItem;
