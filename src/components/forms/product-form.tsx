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
import schemas, { ProductSchemaValues } from "@/validations";
import instance from "@/lib/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formValidationSetter } from "@iam-hussain/qd-copilot";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";

type ProductFormProps = {
  defaultValues: Partial<
    ProductSchemaValues & {
      id?: string;
    }
  >;
  onSuccess?: () => void;
  categories?: { id: string; name: string }[];
};

function ProductForm({
  defaultValues: { id, ...values },
  onSuccess,
  categories,
}: ProductFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<ProductSchemaValues>({
    resolver: zodResolver(schemas.product),
    defaultValues: {
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
        ? instance.patch(`/store/product/${id}`, variables)
        : instance.post("/store/product", variables),
    onSuccess: async (data: any) => {
      console.log({ data });
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
      });

      if (id) {
        toast.success(
          `Product ID ${data.id} has been successfully updated! 🚀`
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
            `Unable to update product with ID ${id}. Please review the entered information and try again. If the issue persists, contact support for further assistance.`
          );
        } else {
          toast.error(
            `Failed to create product. Please verify the provided details and attempt again. If the problem persists, reach out to support for additional help.`
          );
        }
      }
    },
  });

  async function onSubmit(variables: ProductSchemaValues) {
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
