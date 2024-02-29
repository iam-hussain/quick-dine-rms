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

type Menu = {
  icon: IconKey;
  label: string;
  active?: Boolean;
};

const AppMenus: Menu[] = [
  {
    icon: "MdDashboard",
    label: "Dashboard",
  },
  {
    icon: "BsPrinterFill",
    label: "Billing / Orders",
    active: true,
  },
  {
    icon: "SiAirtable",
    label: "Table Orders",
  },
  {
    icon: "MdSoupKitchen",
    label: "Kitchen Display",
  },
  {
    icon: "FaCartShopping",
    label: "Customer Display",
  },
];

const SettingMenus: Menu[] = [
  {
    icon: "FaStore",
    label: "Store",
  },
  {
    icon: "MdEventAvailable",
    label: "Availability",
  },
  {
    icon: "IoFastFoodSharp",
    label: "Products",
  },
  {
    icon: "FaTags",
    label: "Tags",
  },
];

function SideMenu({ className }: { className?: string }) {
  const isSmallDevice = useMedia("(max-width: 1280px)");
  const minimize = useActionStore((state) => !state.isSideBarOpen);
  const setMinimize = useActionStore((state) => state.setSideBarOpen);

  const variants = {
    initial: { width: 50, x: -50 },
    full: { width: 240, x: 0 },
    half: { width: 60, x: 0 },
    close: { width: 60, x: -60 },
  };

  const hideShow = {
    hide: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
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
    },
    expand: {
      x: 80,
    },
  };

  return (
    <motion.div
      initial="half"
      animate={minimize ? (isSmallDevice ? "close" : "half") : "full"}
      variants={variants}
      className={clsx(
        "h-full pb-8 bg-background p-2 xl:relative absolute flex flex-col justify-between",
        className
      )}
    >
      <motion.div
        whileHover="hover"
        whileTap="pressed"
        animate={minimize ? "minimize" : "expand"}
        variants={buttonVariants}
      >
        <Button
          variant={"transparent"}
          className={clsx(
            "md:flex font-normal hidden p-2 m-auto bg-paper-dark text-paper-foreground"
          )}
          onClick={() => setMinimize()}
        >
          <Icon
            name={minimize ? "HiMenuAlt2" : "IoClose"}
            className={"h-5 w-5"}
          />
        </Button>
      </motion.div>
      <div
        className={clsx(
          "flex w-auto gap-2 justify-start align-middle items-center select-none text-right m-auto my-6"
        )}
      >
        <Icon name="FaBowlFood" className="text-primary text-2xl font-thin" />
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
      </div>

      <ScrollArea className="grow w-full flex justify-end">
        <Container className="flex flex-col gap-2 text-right my-2 px-1">
          {AppMenus.map((each, key) => (
            <MenuItem minimize={minimize} active={false} {...each} key={key} />
          ))}
          {SettingMenus.map((each, key) => (
            <MenuItem minimize={minimize} active={false} {...each} key={key} />
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
        <div className={"text-center m-auto w-full py-4"}>
          <p className="text-md font-semibold pb-1 text-foreground/90">
            TastyTidbits Tavern
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
