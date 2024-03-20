"use client";

import clsx from "clsx";
import Icon from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";
import { useActionStore } from "@/stores/actionSlice";
import BrandSideBySide from "../atoms/brand/side-by-side";
import { useMemo, useEffect, useState, useCallback } from "react";
import { useWindowScroll } from "react-use";
import { motion } from "framer-motion";

const closerButton = {
  initial: {},
  pressed: { scale: 0.9 },
  hover: {
    y: 70,
    opacity: 1,
  },
  out: {
    opacity: 1,
    y: 70,
  },
  in: {
    y: 0,
  },
};

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

function TopMenu({
  className,
  isHidden,
  setHidden,
}: {
  className?: string;
  isHidden: Boolean;
  setHidden: any;
}) {
  // const [isHidden, setHidden] = useState(false);
  const { y } = useWindowScroll();
  const [scrollDirection, setScrollDirection] = useState("IDEAL");
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  const setMinimize = useActionStore((state) => state.setSideBarMinimize);

  const callback = useCallback(
    (event: any) => {
      if (!minimize) {
        return setScrollDirection("IDEAL");
      }
      if ((event.wheelDelta && event.wheelDelta > 0) || event.deltaY < 0) {
        return setScrollDirection("UP");
      } else {
        setScrollDirection("DOWN");
      }
    },
    [minimize]
  );

  const shouldHide = useMemo(() => {
    return !isHidden && (y <= 100 || scrollDirection === "UP");
  }, [isHidden, scrollDirection, y]);

  useEffect(() => {
    document.body.addEventListener("wheel", callback);
    return () => document.body.removeEventListener("file-upload", callback);
  }, [callback]);

  return (
    <motion.nav
      className={clsx(
        "border-b border-paper w-full h-[50px] flex justify-center align-middle items-center fixed",
        className
      )}
      initial="show"
      variants={animator}
      transition={{ type: "spring", stiffness: 100 }}
      animate={shouldHide ? "show" : "hide"}
    >
      <Button
        variant={"transparent"}
        className={clsx("flex font-normal absolute left-2", {
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

      <motion.div
        initial="initial"
        whileTap="pressed"
        // whileHover={isHidden ? "hover" : "initial"}
        transition={{ type: "spring", stiffness: 100 }}
        animate={isHidden ? "out" : "in"}
        variants={closerButton}
        className="absolute right-4 w-auto h-auto hidden md:flex"
      >
        <Button
          variant={isHidden ? "accent" : "accent"}
          className={clsx("flex font-normal p-2")}
          onClick={() => {
            if (isHidden) {
              setScrollDirection("UP");
            }
            setHidden(!isHidden);
          }}
        >
          <Icon name={isHidden ? "BiHide" : "BiShow"} className={"h-5 w-5"} />
        </Button>
      </motion.div>
    </motion.nav>
  );
}

export default TopMenu;
