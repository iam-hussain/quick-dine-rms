import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import React from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/atoms/form";

import { Textarea } from "../atoms/textarea";

function OrderNotes() {
  const { control } = useFormContext<OrderUpsertSchemaType>();

  return (
    <FormField
      control={control}
      name="note"
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>Note</FormLabel> */}
          <FormControl>
            <Textarea
              placeholder="Add optional order notes/instructions you want to send to the kitchen."
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default OrderNotes;
