"use client";

import clsx from "clsx";

import { ScrollArea } from "@/components/atoms/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs-primary";
import TokenCollection from "@/components/organisms/token-collection";
import TokenQuery from "@/components/templates/token-query";

export default function Kitchen() {
  return (
    <TokenQuery>
      <div className="flex flex-col w-full h-full justify-center align-middle items-center bg-paper py-4 px-6">
        <Tabs
          defaultValue="progress"
          className={clsx("flex gap-4 flex-col w-full h-full")}
        >
          <TabsList className="flex justify-between align-middle w-full gap-x-h ">
            <h1 className="text-2xl font-semibold text-foreground">
              Kitchen Tokens Display
            </h1>
            <div className="flex gap-4">
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="progress">InProgress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </div>
          </TabsList>
          <div className="p-6 bg-background flex grow h-4/6 ">
            <ScrollArea className={clsx("w-full h-full pr-4")}>
              <TabsContent value="scheduled">
                <TokenCollection variant="scheduled" />
              </TabsContent>
              <TabsContent value="progress">
                <TokenCollection variant="placed" />
              </TabsContent>
              <TabsContent value="completed">
                <TokenCollection
                  variant="completed"
                  noItemMessage={
                    "No items found (You will see only completed token in last 5 hours)"
                  }
                />
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </div>
    </TokenQuery>
  );
}
