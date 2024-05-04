"use client";

import { Container } from "@/components/atoms/container";
import Icon, { IconKey } from "@/components/atoms/icon";
import MenuItem from "@/components/molecules/menu-item";
import { ScrollArea } from "@/components/atoms/scroll-area";
import UserBadge from "../molecules/user-badge";
import { useMedia } from "react-use";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Separator } from "../atoms/separator";
import { useEffect } from "react";
import Loader from "../molecules/loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openSideBar } from "@/store/pageSlice";

type Menu = {
  icon: IconKey;
  label: string;
  active?: Boolean;
  link?: string;
};

const AppMenus: Menu[] = [
  {
    icon: "MdDashboard",
    label: "Dashboard",
    link: "/store/dashboard",
  },
  {
    icon: "BsPrinterFill",
    label: "Billing / Orders",
    active: true,
    link: "/store/pos",
  },
  {
    icon: "SiAirtable",
    label: "Table Orders",
    link: "/store/table",
  },
  {
    icon: "MdSoupKitchen",
    label: "Kitchen Display",
    link: "/store/kitchen",
  },
  {
    icon: "FaCartShopping",
    label: "Customer Display",
    link: "/store/display",
  },
];

const SettingMenus: Menu[] = [
  {
    icon: "FaStore",
    label: "Store",
    link: "/store",
  },
  {
    icon: "MdEventAvailable",
    label: "Availability",
    link: "/store/availability",
  },
  {
    icon: "IoFastFoodSharp",
    label: "Products",
    link: "/store/product",
  },
  {
    icon: "FaTags",
    label: "Category",
    link: "/store/category",
  },
  {
    icon: "FaSave",
    label: "Settings",
    link: "/store/settings",
  },
];

const variants = {
  initial: {
    width: 60,
    x: -60,
  },
  mobInitial: {
    width: 280,
    x: -280,
  },
  full: {
    width: 280,
    x: 0,
    transition: {
      delayChildren: 0.5,
    },
  },
  half: {
    width: 60,
    x: 0,
    transition: {
      delayChildren: 0.5,
    },
  },
  close: {
    width: 60,
    x: -60,
  },
};

const hideShow = {
  hide: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
    },
  },
};

const fader = {
  hide: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
  },
};

const closerButton = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.9 },
  minimize: {
    ease: "linear",
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
    },
  },
  expand: {
    x: 180,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
    },
    ease: "linear",
  },
};

const decorator = {
  hide: {
    opacity: 0,
    zIndex: -10,
    transition: {
      duration: 0.3,
      ease: "linear",
    },
    ease: "linear",
  },

  show: {
    opacity: 1,
    zIndex: 40,
    transition: {
      duration: 0.5,
      ease: "linear",
    },
    ease: "linear",
  },
};

function SideMenu({ className }: { className?: string }) {
  const smallScreen = useMedia("(max-width: 767px)", false);
  const sideBarOpen = useSelector((state: RootState) => state.page.sideBarOpen);
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.base.store);
  const user = useSelector((state: RootState) => state.base.user);

  useEffect(() => {
    if (sideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [sideBarOpen]);

  return (
    <>
      <motion.div
        initial="hide"
        variants={decorator}
        animate={sideBarOpen ? "show" : "hide"}
        onClick={() => dispatch(openSideBar())}
        className="fixed bg-foreground/50 h-full w-screen min-h-fill "
      ></motion.div>
      <motion.div
        initial="initial"
        animate={sideBarOpen ? "full" : "mobInitial"}
        variants={variants}
        transition={{ type: "spring", stiffness: 100 }}
        className={clsx("side-menu py-4 bg-background px-2 z-50", className)}
      >
        <div
          className={clsx(
            "flex w-auto gap-2 justify-start align-middle items-center select-none text-right m-auto my-4 relative"
          )}
        >
          <div className="flex flex-col gap-0 justify-center align-middle items-center">
            <div className="flex flex-col justify-center align-middle items-center gap-0">
              <motion.div
                whileHover="hover"
                whileTap="pressed"
                variants={closerButton}
                className="cursor-pointer flex gap-1 justify-center align-middle items-center"
                onClick={() => dispatch(openSideBar())}
              >
                <Icon
                  name="FaBowlFood"
                  className="text-primary text-2xl font-thin my-[2px]"
                />
                <motion.h1
                  className={clsx("text-xl font-display", {
                    hidden: !smallScreen && !sideBarOpen,
                  })}
                  initial="hide"
                  animate={!sideBarOpen && !smallScreen ? "hide" : "show"}
                  variants={fader}
                >
                  QuickDine
                </motion.h1>
              </motion.div>
            </div>
            <Separator className="my-2 select-none" />
          </div>
        </div>

        <ScrollArea className="grow w-full flex justify-end py-4">
          <Container className="flex flex-col gap-2 text-right my-2 px-1">
            {AppMenus.map((each, key) => (
              <MenuItem
                {...each}
                key={key}
                onRedirect={() => dispatch(openSideBar())}
              />
            ))}
            <Separator className="my-2 select-none" />
            {SettingMenus.map((each, key) => (
              <MenuItem
                {...each}
                key={key}
                onRedirect={() => dispatch(openSideBar())}
              />
            ))}
          </Container>
        </ScrollArea>

        <motion.div
          className={clsx("flex flex-col gap-2", {
            hidden: !sideBarOpen,
          })}
          initial="hide"
          animate={"show"}
          variants={hideShow}
        >
          {!store && <Loader />}
          {store && (
            <div className={"text-center m-auto w-full px-4"}>
              <p className="text-md font-semibold pb-1 text-foreground/90">
                {store?.name || ""}
              </p>
              <div>
                {store?.printDeck &&
                  store?.printDeck?.map((e: string, i: number) => (
                    <p
                      className="text-xs text-foreground/90"
                      key={`printDeck_${i}`}
                    >
                      {e}
                    </p>
                  ))}
              </div>
            </div>
          )}
          {user && (
            <UserBadge
              firstName={user.firstName}
              lastName={user.lastName}
              image=""
              className={"py-2 px-4"}
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default SideMenu;
