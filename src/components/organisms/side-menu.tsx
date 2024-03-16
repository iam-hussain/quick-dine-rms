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
  full: {
    width: 240,
    x: 0,
  },
  half: {
    width: 60,
    x: 0,
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

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.9 },
  minimize: {
    x: 0,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
    },
  },
  expand: {
    x: 50,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
    },
  },
  mobExpand: {
    x: 70,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
    },
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
    <motion.div
      initial="initial"
      animate={minimize ? (isSmallDevice ? "close" : "half") : "full"}
      variants={variants}
      className={clsx(
        "h-[calc(100%-54px)] md:h-full pb-8 bg-background p-2 md:relative absolute flex flex-col justify-between z-50",
        className
      )}
    >
      <div
        className={clsx(
          "flex w-auto gap-2 justify-start align-middle items-center select-none text-right m-auto my-6 relative"
        )}
      >
        <motion.div
          whileHover="hover"
          whileTap="pressed"
          variants={buttonVariants}
          className="cursor-pointer"
          onClick={() => setMinimize()}
        >
          <Icon name="FaBowlFood" className="text-primary text-2xl font-thin" />
        </motion.div>
        <motion.h1
          className={clsx("text-xl font-display", {
            hidden: minimize,
          })}
          initial="hide"
          animate={minimize ? "hide" : "show"}
          variants={fader}
        >
          QuickDine
        </motion.h1>
        <motion.div
          initial="minimize"
          whileHover="hover"
          whileTap="pressed"
          animate={
            minimize ? "minimize" : isSmallDevice ? "mobExpand" : "expand"
          }
          variants={buttonVariants}
          className="absolute right-0"
        >
          <Button
            variant={"accent"}
            className={clsx("flex font-normal p-2 m-auto")}
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
        animate={minimize ? "hide" : "show"}
        variants={hideShow}
      >
        <UserBadge
          name="Zakir Hussain"
          image=""
          minimize={minimize}
          className={clsx("py-2", {
            "px-4": !minimize,
          })}
        />
        {isLoading && <p>Loading</p>}
        <div className={"text-center m-auto w-full py-4"}>
          <p className="text-md font-semibold pb-1 text-foreground/90">
            {data?.name || ""}
          </p>
          <p className="text-xs text-foreground/70">
            1234 NW Bobcat Lane, St. Robert, MO 65584-5678
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SideMenu;
