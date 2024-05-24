import clsx from "clsx";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/atoms/button";
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

function DeleteOrder() {
  const order = useSelector((state: RootState) => state.base.order);
  const { handleSubmit } = useFormContext<OrderUpsertSchemaType>();
  const [open, setOpen] = React.useState(false);

  async function onSubmit(data: OrderUpsertSchemaType) {
    console.log({ data });
    return true;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Delete Order"
          variant={"outline"}
          disabled={!order?.shortId}
          className={clsx(
            "flex justify-center gap-2 font-normal text-lg text-destructive"
          )}
        >
          <Icon name={"MdDeleteOutline"} className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this order? This action cannot be
            undone and all associated data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={handleSubmit(onSubmit)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteOrder;
