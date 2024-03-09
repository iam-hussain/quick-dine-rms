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
import schemas, { TagSchemaValues } from "@/validations";
import { useRouter } from "next/navigation";
import instance from "@/lib/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getValidationMessage } from "@/validations/messages";
import { useEffect } from "react";

const defaultValues: Partial<TagSchemaValues> = {};

type TagFormProps = {};

function TagForm({}: TagFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<TagSchemaValues>({
    resolver: zodResolver(schemas.tag),
    defaultValues,
    mode: "onSubmit",
  });

  const { setError } = form;

  const mutation = useMutation({
    mutationFn: (variables) => instance.post("/store/a-canteen/tag", variables),
    onSuccess: async (data: any) => {
      console.log({ data });
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      form.reset({
        name: "",
        deck: "",
      });
      toast.success("Tag created!");
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

  async function onSubmit(variables: TagSchemaValues) {
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
              <FormLabel>Tag Name</FormLabel>
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
        <div className="pt-4">
          <Button
            className="w-full"
            type="submit"
            // disabled={mutation.isPending}
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TagForm;
