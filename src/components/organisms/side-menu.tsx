"use client";

import { Container } from "@/components/atoms/container";
import Icon, { IconKey } from "@/components/atoms/icon";
import MenuItem from "@/components/molecules/menu-item";
import { ScrollArea } from "@/components/atoms/scroll-area";
import UserBadge from "../molecules/user-badge";
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
    label: "Billing System",
    link: "/store/pos",
  },
  {
    icon: "SiAirtable",
    label: "Orders Display",
    link: "/store/orders",
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
    icon: "FaRegObjectGroup",
    label: "Kitchen Group",
    link: "/store/group",
  },
  {
    icon: "FaSave",
    label: "Settings",
    link: "/store/settings",
  },
];

const variants = {
  initial: {
    x: -500,
  },
  full: {
    x: -185,
    transition: {
      delayChildren: 0.5,
    },
  },
};

const closerButton = {
  initial: { scale: 1 },
  hover: { scale: 1.2 },
  pressed: { scale: 0.8 },
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
        animate={sideBarOpen ? "full" : "initial"}
        variants={variants}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{ width: "500px" }}
        className={clsx(
          "side-menu py-4 bg-background px-2 z-50 items-end relative",
          className
        )}
      >
        <div className="flex justify-center align-middle items-center flex-col h-full w-[300px]">
          <div
            className={clsx(
              "flex gap-2 justify-start align-middle items-center select-none text-right m-auto my-4"
            )}
          >
            <motion.div
              whileHover="hover"
              whileTap="pressed"
              variants={closerButton}
              className="absolute cursor-pointer top-3 right-3"
              onClick={() => dispatch(openSideBar())}
            >
              <Icon name="IoClose" className="h-6 w-6" />
            </motion.div>
            <div className="flex flex-col gap-0 justify-center align-middle items-center">
              <div className="flex flex-col justify-center align-middle items-center gap-0">
                <div className="cursor-pointer flex gap-2 justify-center align-middle items-center">
                  <Icon
                    name="FaBowlFood"
                    className="text-primary text-3xl font-thin my-[2px]"
                  />
                  <h1 className={clsx("text-2xl font-display")}>QuickDine</h1>
                </div>
              </div>
              <Separator className="my-2 select-none" />
            </div>
          </div>

          <ScrollArea className="grow w-full flex justify-end py-4">
            <Container className="flex flex-col gap-3 text-right my-2 px-1">
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

          <div className="grow w-full h-auto flex justify-end flex-col">
            {!store && <Loader />}
            {store && (
              <div className={"text-center w-full px-4 h-auto m-0 mt-auto"}>
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
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SideMenu;
