import { Button } from "@/components/atoms/button";
import clsx from "clsx";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/atoms/dialog";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import usePOSCart from "@/hooks/usePOSCart";
import OrderNotes from "@/components/molecules/order-notes";
import Icon from "@/components/atoms/icon";
import { Label } from "@/components/atoms/label";
import { dateTimeFormatAddMinutes, timeAfterMinutes } from "@/lib/date-time";
import { Input } from "@/components/atoms/input";

function ScheduleDispatch() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const { handleSubmit, watch } = useFormContext<OrderUpsertSchemaType>();
  const { upsert } = usePOSCart();

  const items = watch("items", []);

  async function onSubmit({ items, ...data }: OrderUpsertSchemaType) {
    await upsert({
      ...data,
      status: "IN_PROGRESS",
      scheduledAt: new Date(dateTimeFormatAddMinutes(value)).toISOString(),
      items: items.map((e, i) => ({
        ...e,
        position: i,
      })),
    });
    setOpen(false);
    return true;
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setValue(0);
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          aria-label="Kitchen Dispatch"
          variant={"secondary"}
          className={clsx(
            "flex justify-center gap-2 font-normal w-auto col-span-2"
          )}
          disabled={!items.length}
        >
          <Icon name={"RxLapTimer"} className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex gap-4">
          <DialogTitle>Kitchen Dispatch</DialogTitle>
          <div className="flex justify-center align-middle items-center gap-2 text-center">
            <Label htmlFor="minutes" className="text-base">
              In
            </Label>
            <Input
              value={value}
              onChange={handleChange}
              type="number"
              className="w-[80px]"
            />
            <Label htmlFor="minutes" className="text-base">
              Minutes
            </Label>
            <p>is {timeAfterMinutes(value)}</p>
          </div>
          <OrderNotes />
          <DialogDescription className="text-foreground">
            Are you sure you want to schedule the dispatch of these items to the
            kitchen to start the cooking process? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Dispatch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleDispatch;
