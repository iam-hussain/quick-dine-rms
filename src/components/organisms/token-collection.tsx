import { SortTokensResult, TokenType } from "@/types";
import React from "react";
import TokenCard from "../molecules/token-card";

export interface TokenCollectionProps {
  tokens: TokenType[];
  type: keyof SortTokensResult;
  noItemMessage?: string;
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
    <div className="flex flex-wrap align-top items-start gap-4 m-0 justify-center">
      {tokens.map(({ items, ...token }) => (
        <TokenCard key={token.id} token={token} items={items} {...props} />
      ))}
    </div>
  );
}

export default TokenCollection;
