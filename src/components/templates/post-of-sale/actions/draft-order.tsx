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
import Icon from "@/components/atoms/icon";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import usePOSCart from "@/hooks/usePOSCart";

function DraftOrder() {
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, formState } = useFormContext<OrderUpsertSchemaType>();
  const { isDirty, isSubmitting } = formState;
  const { upsert } = usePOSCart();

  async function onSubmit({ items, ...data }: OrderUpsertSchemaType) {
    await upsert({
      ...data,
      items: items.map((e, i) => ({ ...e, position: i })),
    });
    setOpen(false);
    return true;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Draft Order"
          variant={"outline"}
          className={clsx("flex justify-center gap-2 font-normal text-lg")}
          disabled={!isDirty || isSubmitting}
        >
          <Icon name={"FaSave"} className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Draft Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to submit this order as a draft?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DraftOrder;
