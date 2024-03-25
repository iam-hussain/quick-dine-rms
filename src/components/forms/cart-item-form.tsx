"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import schemas, { CartItemSchemaValues } from "@/validations";

type CartItemFormProps = {
  defaultValues?: Partial<
    CartItemSchemaValues & {
      id?: string;
    }
  >;
  onSuccess?: (v: CartItemSchemaValues) => void;
};

function CartItemForm({ defaultValues, onSuccess }: CartItemFormProps) {
  const { id, ...values } = defaultValues || {};

  const form = useForm<CartItemSchemaValues>({
    resolver: zodResolver(schemas.cartItem),
    defaultValues: {
      ...values,
    },
    mode: "onSubmit",
  });

  async function onSubmit(variables: CartItemSchemaValues) {
    console.log({ variables });
    if (onSuccess) {
      onSuccess(variables);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name={`title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`note`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking Note</FormLabel>
              <FormControl>
                <Input placeholder="Cooking Note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Quantity" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4 text-right">
          <Button className="md:w-auto w-full" type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CartItemForm;
