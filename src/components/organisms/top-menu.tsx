"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowScroll } from "react-use";

import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import { RootState } from "@/store";
import { openSideBar, openTopBar } from "@/store/pageSlice";

import BrandSideBySide from "../atoms/brand/side-by-side";

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

function TopMenu({ className }: { className?: string }) {
  const { y } = useWindowScroll();
  const [scrollDirection, setScrollDirection] = useState("IDEAL");
  const sideBarOpen = useSelector((state: RootState) => state.page.sideBarOpen);
  const topBarOpen = useSelector((state: RootState) => state.page.topBarOpen);
  const dispatch = useDispatch();

  const callback = useCallback(
    (event: any) => {
      if (sideBarOpen) {
        return setScrollDirection("IDEAL");
      }
      if ((event.wheelDelta && event.wheelDelta > 0) || event.deltaY < 0) {
        return setScrollDirection("UP");
      } else {
        setScrollDirection("DOWN");
      }
    },
    [sideBarOpen],
  );

  const shouldHide = useMemo(() => {
    return topBarOpen && (y <= 100 || scrollDirection === "UP");
  }, [topBarOpen, scrollDirection, y]);

  useEffect(() => {
    document.body.addEventListener("wheel", callback);
    return () => document.body.removeEventListener("file-upload", callback);
  }, [callback]);

  return (
    <motion.nav
      className={clsx(
        "border-b border-paper w-full h-[50px] flex justify-center align-middle items-center fixed",
        className,
      )}
      initial="show"
      variants={animator}
      transition={{ type: "spring", stiffness: 100 }}
      animate={shouldHide ? "show" : "hide"}
    >
      <Button
        variant={"transparent"}
        className={clsx("flex font-normal absolute left-2", {
          "text-inactive-foreground": sideBarOpen,
          "text-primary": !sideBarOpen,
        })}
        onClick={() => dispatch(openSideBar())}
      >
        <Icon
          name={sideBarOpen ? "IoClose" : "HiMenuAlt2"}
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
        transition={{ type: "spring", stiffness: 100 }}
        animate={topBarOpen ? "in" : "out"}
        variants={closerButton}
        className="absolute right-4 w-auto h-auto hidden md:flex"
      >
        <Button
          variant={"accent"}
          className={clsx("flex font-normal p-2")}
          onClick={() => {
            if (!topBarOpen) {
              setScrollDirection("UP");
            }
            dispatch(openTopBar());
          }}
        >
          <Icon name={topBarOpen ? "BiShow" : "BiHide"} className={"h-5 w-5"} />
        </Button>
      </motion.div>
    </motion.nav>
  );
}

export default TopMenu;
