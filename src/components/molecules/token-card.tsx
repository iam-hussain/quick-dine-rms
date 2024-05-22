import { SortTokensResult, SortItemsResult, TokenType } from "@/types";
import React, { useEffect, useState } from "react";
import { Button } from "../atoms/button";
import TokenItem from "./token-item";
import clsx from "clsx";
import CountUp from "./count-up";

export interface TokenCardProps {
  token: Omit<TokenType, "items">;
  items: SortItemsResult;
  type: keyof SortTokensResult;
  onItemClick?: ({
    id,
    type,
  }: {
    id: string;
    orderId?: string | null;
    type: "ACCEPT" | "COMPLETE" | "REJECT";
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
}

function TokenCard({
  token,
  items,
  type,
  onCompleteClick,
  onItemClick,
}: TokenCardProps) {
  const isCompleted = items.valid.length === items.completed.length;

  const onCompletedClickHandler = () => {
    if (onCompleteClick && isCompleted) {
      onCompleteClick({
        id: token.id,
        shortId: token.shortId,
        orderId: token.orderId,
      });
    }
  };

  const onItemClickHandler = ({
    id,
    type,
  }: {
    id: string;
    type: "ACCEPT" | "COMPLETE" | "REJECT";
  }) => {
    if (onItemClick) {
      onItemClick({
        id,
        type,
        orderId: token.orderId,
      });
    }
  };

  return (
    <div
      key={token.id}
      className={clsx(
        "flex flex-col h-auto gap-2 w-auto min-w-[300px] overflow-auto rounded-lg p-4 border-2 border-foreground/60"
      )}
    >
      <div className="pb-1 border-b border-foreground/50 flex">
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between w-full gap-2">
            <p className="text-lg font-medium ">#{token.displayId}</p>
            <div className="flex flex-col justify-center align-middle items-end">
              <p className="font-medium text-sm text-foreground/70">
                Order:{" "}
                <span className="text-foreground/90">
                  #{token.order.shortId}
                </span>
              </p>
              <CountUp inputTime={token.placedAt} />
              {token.kitchenCategory?.name && (
                <p className="text-foreground/90 font-medium text-base">
                  {token.kitchenCategory?.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-col py-2">
        {Boolean(items.scheduled.length) && (
          <div className="flex flex-col">
            {items.scheduled.map((item, i) => (
              <TokenItem
                item={item}
                key={item.id}
                variant={item.variant}
                onClick={onItemClickHandler}
                hideDivider={i + 1 === items.scheduled.length}
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

      {type === "placed" && (
        <Button
          variant={isCompleted ? "secondary" : "accent"}
          className="w-full"
          onClick={() => onCompletedClickHandler()}
          disabled={!isCompleted}
        >
          Completed
        </Button>
      )}
    </div>
  );
}

export default TokenCard;
