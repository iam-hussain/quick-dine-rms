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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CategoryCreateSchema,
  CategoryCreateSchemaType,
  formValidationSetter,
} from "@iam-hussain/qd-copilot";
import fetcher from "@/lib/fetcher";

type CategoryFormProps = {
  defaultValues: Partial<
    CategoryCreateSchemaType & {
      id?: string;
    }
  >;
  onSuccess?: () => void;
  type?: "DEFAULT" | "KITCHEN";
};

function CategoryForm({
  defaultValues: { id, ...values },
  onSuccess,
  type,
}: CategoryFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<CategoryCreateSchemaType>({
    resolver: zodResolver(CategoryCreateSchema),
    defaultValues: {
      name: "",
      deck: "",
      position: 0,
      type,
      ...values,
    },
    mode: "onSubmit",
  });

  const {
    setError,
    formState: { isDirty, isSubmitting },
  } = form;

  const mutation = useMutation({
    mutationFn: (variables) =>
      id
        ? fetcher.patch(`/store/category/${id}`, variables)
        : fetcher.post("/store/category", variables),
    onSuccess: async (data: any) => {
      form.reset({
        name: data.name,
        deck: data.deck || "",
        position: data.position,
      });
      if (onSuccess) {
        onSuccess();
      }
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      if (id) {
        toast.success(
          `Category ID ${data.id} has been successfully updated! 🚀`
        );
      } else {
        toast.success(`A new category with ID ${data.id} has been created! 🌟`);
      }
    },
    onError: (err) => {
      const errors = formValidationSetter(err, setError);
      if (!errors.length) {
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
    },
  });

  async function onSubmit(variables: CategoryCreateSchemaType) {
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
            disabled={!isDirty || isSubmitting || mutation.isPending}
          >
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CategoryForm;
