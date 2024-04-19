"use client";

import { Button } from "@/components/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import clsx from "clsx";

export function KitchenDispatch({ btnClassName, items, fetched }: {
    btnClassName?: string,
    items: any[],
    fetched: any
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={clsx(btnClassName)}>Kitchen Dispatch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kitchen Dispatch</DialogTitle>
          <DialogDescription>
          Ensure timely preparation by initiating cooking processes for select items prior to payment completion, streamlining service for table and dine-in orders.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Push to Kitchen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
