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
import instance from "@/lib/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getValidationMessage } from "@/validations/messages";

type CategoryFormProps = {
  defaultValues: Partial<
    CategorySchemaValues & {
      id?: string;
    }
  >;
  onSuccess?: () => void;
};

function CategoryForm({
  defaultValues: { id, ...values },
  onSuccess,
}: CategoryFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<CategorySchemaValues>({
    resolver: zodResolver(schemas.category),
    defaultValues: {
      position: 0,
      ...values,
    },
    mode: "onSubmit",
  });

  const { setError } = form;

  const mutation = useMutation({
    mutationFn: (variables) =>
      id
        ? instance.patch(`/store/category/${id}`, variables)
        : instance.post("/store/category", variables),
    onSuccess: async (data: any) => {
      if (onSuccess) {
        onSuccess();
      }
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.reset({
        name: "",
        deck: "",
      });
      if (id) {
        toast.success(
          `Category ID ${data.shortId} has been successfully updated! 🚀`
        );
      } else {
        toast.success(
          `A new category with ID ${data.shortId} has been created! 🌟`
        );
      }
    },
    onError: (err) => {
      if (typeof err === "string") {
        const { name, error } = getValidationMessage(err);
        if (name && error) {
          setError(name as any, error);
        } else {
          if (id) {
            toast.error(
              `Unable to update category with ID ${id}. Please review the entered information and try again. If the issue persists, contact support for further assistance.`
            );
          } else {
            toast.error(
              `Failed to create category. Please verify the provided details and attempt again. If the problem persists, reach out to support for additional help.`
            );
          }
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
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Position" type="number" {...field} />
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
