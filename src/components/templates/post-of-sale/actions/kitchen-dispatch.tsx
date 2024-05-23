import { Button } from "@/components/atoms/button";
import clsx from "clsx";
import React, { useContext } from "react";
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

function KitchenDispatch() {
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, watch } = useFormContext<OrderUpsertSchemaType>();
  const { upsert } = usePOSCart();

  const items = watch("items", []);

  async function onSubmit({ items, ...data }: OrderUpsertSchemaType) {
    await upsert({
      ...data,
      status: "IN_PROGRESS",
      items: items.map((e, i) => ({
        ...e,
        placedAt: new Date().toISOString(),
        position: i,
      })),
    });
    setOpen(false);
    return true;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Kitchen Dispatch"
          variant={"secondary"}
          className={clsx(
            "flex justify-center gap-2 font-normal w-full col-span-2"
          )}
          disabled={!items.length}
        >
          Kitchen Dispatch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex gap-4">
          <DialogTitle>Kitchen Dispatch</DialogTitle>
          <OrderNotes />
          <DialogDescription className="text-foreground">
            Are you sure you want to dispatch these items to the kitchen to
            start the cooking process? This action cannot be undone.
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

export default KitchenDispatch;
