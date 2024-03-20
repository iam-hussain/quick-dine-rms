import React from "react";
import { usePathname } from "next/navigation";
import Icon, { IconKey } from "@/components/atoms/icon";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMedia } from "react-use";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/atoms/tooltip";

function MenuItem({
  icon,
  label,
  minimize,
  link,
  onRedirect,
}: {
  icon: IconKey;
  label: string;
  minimize: Boolean;
  link?: string;
  onRedirect?: () => void;
}) {
  const isSmallDevice = useMedia("(max-width: 767px)", false);
  // if (minimize) {
  //   return (
  //     <TooltipProvider>
  //       <Tooltip>
  //         <TooltipTrigger asChild>
  //           <Button
  //             variant={"ghost"}
  //             className={clsx(
  //               "flex justify-center gap-2 font-norma px-1 py-1",
  //               {
  //                 "text-primary border-2 border-primary": active,
  //                 "text-inactive-foreground border-2 border-bw": !active,
  //               }
  //             )}
  //           >
  //             <Icon name={icon} className="h-5 w-5" />
  //           </Button>
  //         </TooltipTrigger>
  //         <TooltipContent className="bg-bw-foreground text-bw">
  //           <p>{label}</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     </TooltipProvider>
  //   );
  // }

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
        "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "flex gap-2 font-normal hover:bg-paper hover:text-foreground align-middle items-center",
        {
          "text-primary bg-paper/70": link === pathname,
          "text-foreground/70": link !== pathname,
          "justify-center p-2": !isSmallDevice && minimize,
          "justify-start px-4 py-2": !minimize,
        }
      )}
      onClick={onRedirect}
      href={link || "#"}
    >
      <Icon name={icon} className="h-5 w-5" />
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
