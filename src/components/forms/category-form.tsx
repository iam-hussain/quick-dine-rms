"use client";
import { toast } from "sonner";
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
import schemas, { CategorySchemaValues } from "@/validations";
import { useRouter } from "next/navigation";
import instance from "@/lib/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getValidationMessage } from "@/validations/messages";
import { useEffect } from "react";

type CategoryFormProps = {
  id?: string;
  defaultValues: Partial<CategorySchemaValues>;
  onSuccess?: () => void;
};

function CategoryForm({ id = "", defaultValues, onSuccess }: CategoryFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<CategorySchemaValues>({
    resolver: zodResolver(schemas.category),
    defaultValues,
    mode: "onSubmit",
  });

  const { setError } = form;

  const mutation = useMutation({
    mutationFn: (variables) =>
      id
        ? instance.post(`/store/category/${id}`, variables)
        : instance.post("/store/category", variables),
    onSuccess: async (data: any) => {
      if(onSuccess) {
        onSuccess()
      }
      console.log({ data });
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.reset({
        name: "",
        deck: "",
      });
      if (id) {
        toast.success("Category updated!");
      } else {
        toast.success("Category created!");
      }
    },
    onError: (err) => {
      if (typeof err === "string") {
        const { name, error } = getValidationMessage(err);
        if (name && error) {
          setError(name as any, error);
        }
      }
    },
  });

  async function onSubmit(variables: CategorySchemaValues) {
    console.log({ variables });
    return await mutation.mutateAsync(variables as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deck"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4 text-right">
          <Button
            className="md:w-auto w-full"
            type="submit"
            disabled={mutation.isPending}
          >
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CategoryForm;
