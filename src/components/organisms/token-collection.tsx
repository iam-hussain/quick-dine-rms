import React from "react";

import { SortTokensResult, TokenType } from "@/types";

import TokenCard from "../molecules/token-card";

export interface TokenCollectionProps {
  tokens: TokenType[];
  variant: keyof SortTokensResult;
  noItemMessage?: string;
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

function TokenCollection({
  tokens,
  noItemMessage,
  ...props
}: TokenCollectionProps) {
  if (tokens.length === 0) {
    return (
      <p className="text-sm text-foreground/80 text-center w-full py-8 m-auto grow grid-cols-12">
        {noItemMessage || "No tokens found"}
      </p>
    );
  }
  return (
    <div className="flex flex-wrap align-top items-start gap-6 m-0 justify-center">
      {tokens.map(({ items, ...token }) => (
        <TokenCard key={token.id} token={token} items={items} {...props} />
      ))}
    </div>
  );
}

export default TokenCollection;
