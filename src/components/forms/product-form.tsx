"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formValidationSetter,
  ProductCreateSchema,
  ProductCreateSchemaType,
} from "@iam-hussain/qd-copilot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import fetcher from "@/lib/fetcher";

type ProductFormProps = {
  defaultValues: Partial<
    ProductCreateSchemaType & {
      id?: string;
    }
  >;
  onSuccess?: () => void;
  categories?: { id: string; name: string }[];
  kitchenCategories?: { id: string; name: string }[];
};

function ProductForm({
  defaultValues: { id, ...values },
  onSuccess,
  categories = [],
  kitchenCategories = [],
}: ProductFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<ProductCreateSchemaType>({
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: {
      name: "",
      deck: "",
      price: 0,
      type: undefined,
      categoryId: "",
      kitchenCategoryId: "",
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
        ? fetcher.patch(`/store/product/${id}`, variables)
        : fetcher.post("/store/product", variables),
    onSuccess: async (data: any) => {
      if (onSuccess) {
        onSuccess();
      }
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      form.reset({
        name: data.name,
        deck: data.deck || "",
        price: data.price,
        type: data.type,
        categoryId: data.categoryId,
        kitchenCategoryId: data.kitchenCategoryId || "",
      });

      if (id) {
        toast.success(
          `Product ID ${data.id} has been successfully updated! 🚀`,
        );
      } else {
        toast.success(`A new product with ID ${data.id} has been created! 🌟`);
      }
    },
    onError: (err) => {
      const errors = formValidationSetter(err, setError);
      if (!errors.length) {
        if (id) {
          toast.error(
            `Unable to update product with ID ${id}. Please review the entered information and try again. If the issue persists, contact support for further assistance.`,
          );
        } else {
          toast.error(
            `Failed to create product. Please verify the provided details and attempt again. If the problem persists, reach out to support for additional help.`,
          );
        }
      }
    },
  });

  async function onSubmit(variables: ProductCreateSchemaType) {
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  type="number"
                  step={"any"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger {...field}>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Food Type</SelectLabel>
                    <SelectItem value="NON_VEG">Non-vegetarian</SelectItem>
                    <SelectItem value="VEG">Vegetarian</SelectItem>
                    <SelectItem value="VEGAN">Vegan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger {...field}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories?.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kitchenCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kitchen Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger {...field}>
                  <SelectValue placeholder="Select a kitchen group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kitchen Group</SelectLabel>
                    {kitchenCategories?.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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

export default ProductForm;
