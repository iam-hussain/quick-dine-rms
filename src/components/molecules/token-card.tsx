import { SortTokensResult, SortItemsResult, TokenType } from "@/types";
import React, { useEffect, useState } from "react";
import { Button } from "../atoms/button";
import TokenItem from "./token-item";
import clsx from "clsx";
import CountUp from "./count-up";
import Icon from "../atoms/icon";
import CountDown from "./count-down";

export interface TokenCardProps {
  token: Omit<TokenType, "items">;
  items: SortItemsResult;
  variant: keyof SortTokensResult;
  onItemClick?: ({
    id,
    mode,
  }: {
    id: string;
    shortId: string;
    orderId?: string | null;
    mode: "ACCEPT" | "COMPLETE" | "REJECT";
  }) => void;
  onCompleteClick?: ({
    id,
    shortId,
    orderId,
  }: {
    id: string;
    shortId: string;
    orderId?: string | null;
  }) => void;
  onDispatchClick?: ({
    id,
    shortId,
    orderId,
  }: {
    id: string;
    shortId: string;
    orderId?: string | null;
  }) => void;
}

function TokenCard({
  token,
  items,
  variant,
  onCompleteClick,
  onItemClick,
  onDispatchClick,
}: TokenCardProps) {
  const [editMode, setEditMode] = useState(false);
  const isCompleted = items.validCount === items.completed.length;

  const onCompletedClickHandler = () => {
    if (onCompleteClick && isCompleted && variant === "placed") {
      onCompleteClick({
        id: token.id,
        shortId: token.shortId,
        orderId: token.orderId,
      });
    }
  };

  const onDispatchClickHandler = () => {
    if (onDispatchClick && variant === "scheduled") {
      onDispatchClick({
        id: token.id,
        shortId: token.shortId,
        orderId: token.orderId,
      });
    }
  };

  const onItemClickHandler = ({
    id,
    mode,
  }: {
    id: string;
    mode: "ACCEPT" | "COMPLETE" | "REJECT";
  }) => {
    if (onItemClick && variant === "placed") {
      onItemClick({
        id,
        mode,
        orderId: token.orderId,
        shortId: token.shortId,
      });
    }
  };

  return (
    <div
      key={token.id}
      className={clsx(
        "flex flex-col h-auto gap-4 w-auto min-w-[300px] overflow-auto rounded-lg p-4 border-2 bg-paper",
        {
          "border-rose-400": editMode,
          "border-paper": !editMode,
        }
      )}
    >
      <div className="pb-1 border-b border-foreground/50 flex">
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between w-full gap-2">
            <div className="flex flex-col justify-start align-middle items-center">
              <div className="flex justify-start align-middle items-center gap-2 w-full">
                <p className="text-lg font-medium ">#{token.displayId}</p>
                {variant === "placed" && (
                  <Button
                    variant={"ghost"}
                    className={clsx(
                      "px-2 py-1 hover:scale-105 active:scale-95",
                      {
                        "text-rose-400 border border-rose-400": editMode,
                        "text-foreground/70": !editMode,
                      }
                    )}
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Icon name="FiEdit" className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center align-middle items-end">
              <p className="font-medium text-sm text-foreground/70">
                Order:{" "}
                <span className="text-foreground/90">
                  #{token.order.shortId}
                </span>
              </p>
              {token.kitchenCategory?.name && (
                <p className="text-foreground/90 font-medium text-base">
                  {token.kitchenCategory?.name}
                </p>
              )}
              {variant === "placed" && <CountUp inputTime={token.placedAt} />}
              {variant === "scheduled" && (
                <CountDown inputTime={token.placedAt} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-col">
        {Boolean(items.scheduled.length) && (
          <div className="flex flex-col">
            {items.scheduled.map((item, i) => (
              <TokenItem
                item={item}
                key={item.id}
                variant={item.variant}
                onClick={onItemClickHandler}
                hideDivider={i + 1 === items.scheduled.length}
                editMode={editMode}
              />
            ))}
          </div>
        )}

        {Boolean(items.placed.length) && (
          <div className="flex flex-col">
            {items.placed.map((item, i) => (
              <TokenItem
                item={item}
                key={item.id}
                variant={item.variant}
                onClick={onItemClickHandler}
                hideDivider={i + 1 === items.placed.length}
                editMode={editMode}
              />
            ))}
          </div>
        )}

        {Boolean(items.accepted.length) && (
          <div className="flex flex-col">
            {items.accepted.map((item, i) => (
              <TokenItem
                item={item}
                key={item.id}
                variant={item.variant}
                onClick={onItemClickHandler}
                hideDivider={i + 1 === items.accepted.length}
                editMode={editMode}
              />
            ))}
          </div>
        )}

        {Boolean(items.completed.length) && (
          <div className="flex flex-col">
            {items.completed.map((item, i) => (
              <TokenItem
                item={item}
                key={item.id}
                variant={item.variant}
                onClick={onItemClickHandler}
                hideDivider={i + 1 === items.completed.length}
                editMode={editMode}
              />
            ))}
          </div>
        )}

        {Boolean(items.rejected.length) && (
          <div className="flex flex-col">
            {items.rejected.map((item, i) => (
              <TokenItem
                item={item}
                key={item.id}
                variant={item.variant}
                onClick={onItemClickHandler}
                hideDivider={i + 1 === items.rejected.length}
              />
            ))}
          </div>
        )}
      </div>
      {token.note && (
        <p className="text-sm  w-fit max-w-[300px] m-auto">
          <span className="font-medium">Notes: </span>
          {token.note}
        </p>
      )}
      {variant === "placed" && (
        <Button
          variant={isCompleted ? "secondary" : "accent"}
          className="w-full"
          onClick={() => onCompletedClickHandler()}
          disabled={!isCompleted}
        >
          Completed
        </Button>
      )}
      {variant === "scheduled" && (
        <Button
          variant={"accent"}
          className="w-full"
          onClick={() => onDispatchClickHandler()}
        >
          Dispatch Now
        </Button>
      )}
    </div>
  );
}

export default TokenCard;
