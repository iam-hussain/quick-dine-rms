"use client";
import { Container } from "@/components/atoms/container";
import Icon, { IconKey } from "@/components/atoms/icon";
import MenuItem from "@/components/molecules/menu-item";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Button } from "@/components/atoms/button";
import { useActionStore } from "@/stores/actionSlice";
import UserBadge from "../molecules/user-badge";
import { useMedia } from "react-use";
import { motion } from "framer-motion";
import clsx from "clsx";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "../atoms/separator";

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
  const isSmallDevice = useMedia("(max-width: 767px)", false);
  const minimize = useActionStore((state) => state.isSideBarMinimized);
  const setMinimize = useActionStore((state) => state.setSideBarMinimize);
  const { data, isLoading } = useQuery({
    queryKey: ["store"],
    queryFn: () => instance.get("/store") as any,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  return (
    <>
      <motion.div
        initial="hide"
        variants={decorator}
        animate={minimize ? "hide" : "show"}
        onClick={() => setMinimize()}
        className="fixed bg-foreground/50 h-full w-screen min-h-fill md:hidden"
      ></motion.div>
      <motion.div
        initial="initial"
        animate={minimize ? (isSmallDevice ? "mobInitial" : "half") : "full"}
        variants={variants}
        transition={{ type: "spring", stiffness: 100 }}
        className={clsx(
          "h-full py-4 bg-background px-2 fixed flex flex-col justify-between z-50",
          className
        )}
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
                onClick={() => setMinimize()}
              >
                <Icon
                  name="FaBowlFood"
                  className="text-primary text-2xl font-thin my-[2px]"
                />
                <motion.h1
                  className={clsx("text-xl font-display", {
                    hidden: !isSmallDevice && minimize,
                  })}
                  initial="hide"
                  animate={minimize && !isSmallDevice ? "hide" : "show"}
                  variants={fader}
                >
                  QuickDine
                </motion.h1>
              </motion.div>
            </div>
            <Separator className="my-2 select-none" />
          </div>
          <motion.div
            initial="minimize"
            whileHover="hover"
            whileTap="pressed"
            transition={{ type: "spring", stiffness: 100 }}
            animate={minimize ? "minimize" : "expand"}
            variants={closerButton}
            className="absolute right-0 left-0"
          >
            <Button
              variant={"accent"}
              className={clsx("flex font-normal p-2")}
              onClick={() => setMinimize()}
            >
              <Icon name={"IoIosArrowBack"} className={"h-5 w-5"} />
            </Button>
          </motion.div>
        </div>

        <ScrollArea className="grow w-full flex justify-end py-4">
          <Container className="flex flex-col gap-2 text-right my-2 px-1">
            {AppMenus.map((each, key) => (
              <MenuItem minimize={minimize} {...each} key={key} />
            ))}
            <Separator className="my-2 select-none" />
            {SettingMenus.map((each, key) => (
              <MenuItem minimize={minimize} {...each} key={key} />
            ))}
          </Container>
        </ScrollArea>

        <motion.div
          className={clsx("flex flex-col gap-2", {
            hidden: minimize,
          })}
          initial="hide"
          animate={minimize && !isSmallDevice ? "hide" : "show"}
          variants={hideShow}
        >
          {isLoading && <p>Loading</p>}
          {!isLoading && (
            <div className={"text-center m-auto w-full px-4"}>
              <p className="text-md font-semibold pb-1 text-foreground/90">
                {data?.name || ""}
              </p>
              <p className="text-xs text-foreground/90">
                1234 NW Bobcat Lane, St. Robert, MO 65584-5678
              </p>
            </div>
          )}

          <UserBadge
            name="Zakir Hussain"
            image=""
            minimize={minimize}
            className={clsx("py-2", {
              "px-4": !minimize,
            })}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default SideMenu;
