"use client";

import clsx from "clsx";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";
import { useActionStore } from "@/stores/actionSlice";
import BrandSideBySide from "../atoms/brand/side-by-side";
import { MutableRefObject } from "react";
import { useScroll } from "react-use";
import { motion } from "framer-motion";

function TopMenu({
  className,
  containerRef,
}: {
  className?: string;
  containerRef: MutableRefObject<null>;
}) {
  const { y } = useScroll(containerRef);
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  const setMinimize = useActionStore((state) => state.setSideBarMinimize);

  const animator = {
    hide: {
      y: -54,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.nav
      className={clsx("border-b border-paper w-full h-auto", className)}
      initial="show"
      variants={animator}
      transition={{ type: "spring", stiffness: 100 }}
      animate={y >= 170 ? "hide" : "show"}
    >
      <div className="flex justify-center align-middle items-center min-h-[54px] relative">
        <Button
          variant={"transparent"}
          className={clsx("flex font-normal md:hidden absolute left-2", {
            "text-inactive-foreground": !minimize,
            "text-primary": minimize,
          })}
          onClick={() => setMinimize()}
        >
          <Icon
            name={minimize ? "HiMenuAlt2" : "IoClose"}
            className={clsx("h-5 w-5")}
          />
        </Button>
        <div className="flex gap-4 m-auto justify-center">
          <BrandSideBySide
            className={clsx("h-[40px] py-2 md:ml-0 ml-2 w-auto", {})}
          />
          <h1 className="hidden">QuickDine</h1>
        </div>
      </div>
    </motion.nav>
  );
}

export default TopMenu;
