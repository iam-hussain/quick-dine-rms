import { useStoreStore } from "@/stores/storeSlice";
import React, { useContext } from "react";
import { Control, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/atoms/form";
import {
  Select,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import { OrderContext } from "../providers/order-provider";

function OrderTypeSelect({}: { className?: string }) {
  const { control } = useFormContext<OrderUpsertSchemaType>();
  const { order } = useContext(OrderContext);
  const { enableExpressOrder = true } = useStoreStore(
    (state) => state.featureFlags
  );

  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="min-w-32">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Select a order type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order Type</SelectLabel>
                {(enableExpressOrder || order?.type === "PICK_UP") && (
                  <SelectItem value="PICK_UP">Express</SelectItem>
                )}
                <SelectItem value="DINING">Dine In</SelectItem>
                <SelectItem value="TAKE_AWAY">Take Away</SelectItem>
                <SelectItem value="DELIVERY">Delivery</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default OrderTypeSelect;
