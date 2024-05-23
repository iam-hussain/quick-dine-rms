import React from "react";
import clsx from "clsx";
import { ItemType, SortItemsResult } from "@/types";
import Icon from "../atoms/icon";
import { Button } from "../atoms/button";
import { Separator } from "../atoms/separator";

const buttonAnimateClass = "hover:scale-105 active:scale-95";

export interface TokenTypeProps {
  item: ItemType;
  variant: keyof SortItemsResult;
  hideDivider?: boolean;
  editMode?: boolean;
  onClick?: ({
    id,
    mode,
  }: {
    id: string;
    mode: "ACCEPT" | "COMPLETE" | "REJECT";
  }) => void;
}

function TokenItem({
  item,
  hideDivider = false,
  editMode = false,
  variant,
  onClick,
}: TokenTypeProps) {
  const onClickHandler = (mode: "ACCEPT" | "COMPLETE" | "REJECT") => {
    if (onClick) {
      onClick({ id: item.id, mode });
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col h-auto w-auto justify-center align-middle items-center"
      )}
    >
      <div
        className={clsx(
          "flex w-full justify-between align-middle items-center text-left px-2 gap-2"
        )}
      >
        <div
          className={clsx(
            "flex w-full justify-start items-center align-middle gap-4 py-2",
            {
              "text-sm font-normal text-foreground/80": variant === "rejected",
              "text-base font-medium text-foreground": variant !== "rejected",
            }
          )}
        >
          <p className="">{item.quantity}</p>
          <p className="">{item?.title || ""}</p>
        </div>

        {editMode ? (
          <>
            {["placed", "accepted"].includes(variant) && (
              <Button
                variant={"transparent"}
                className={clsx("p-0 text-rose-400", buttonAnimateClass)}
                onClick={() => onClickHandler("REJECT")}
              >
                <Icon name="TiCancel" className="w-8 h-8" />
              </Button>
            )}
          </>
        ) : (
          <>
            {variant === "placed" && (
              <Button
                variant={"transparent"}
                className={clsx("p-0 text-sky-600", buttonAnimateClass)}
                onClick={() => onClickHandler("ACCEPT")}
              >
                <Icon name="MdOutlinePendingActions" className="w-8 h-8" />
              </Button>
            )}

            {variant === "accepted" && (
              <Button
                variant={"transparent"}
                className={clsx("p-0 text-lime-600", buttonAnimateClass)}
                onClick={() => onClickHandler("COMPLETE")}
              >
                <Icon name="GiCampCookingPot" className="w-8 h-8" />
              </Button>
            )}
          </>
        )}

        {variant === "completed" && (
          <Icon
            name="IoCheckmarkDoneCircle"
            className="w-9 h-9 text-foreground"
          />
        )}

        {variant === "rejected" && (
          <Icon
            name="MdCancelPresentation"
            className="w-6 h-6 text-foreground/60"
          />
        )}
      </div>
      {!hideDivider && <Separator className="" />}
    </div>
  );
}

export default TokenItem;
