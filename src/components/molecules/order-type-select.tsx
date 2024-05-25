import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import { FormField, FormItem, FormMessage } from "@/components/atoms/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { RootState } from "@/store";

function OrderTypeSelect() {
  const { control } = useFormContext<OrderUpsertSchemaType>();
  const featureFlags = useSelector(
    (state: RootState) => state.base.featureFlags
  );
  const { enableExpressOrder } = featureFlags;

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
                {(enableExpressOrder || field.value === "PICK_UP") && (
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
