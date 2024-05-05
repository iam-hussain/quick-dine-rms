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

function KitchenDispatch() {
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, formState, watch } =
    useFormContext<OrderUpsertSchemaType>();
  const { isDirty, isSubmitting } = formState;
  const { upsert } = usePOSCart();
  const items = watch("items", []);

  async function onSubmit({ items, ...data }: OrderUpsertSchemaType) {
    await upsert({
      ...data,
      status: "IN_PROGRESS",
      items: items.map((e) => ({
        ...e,
        status: "PLACED",
        placedAt: new Date().toISOString(),
      })),
    });
    setOpen(false);
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
          disabled={!isDirty || isSubmitting || !items.length}
        >
          Kitchen Dispatch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kitchen Dispatch</DialogTitle>
          <DialogDescription>
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
