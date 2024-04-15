"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/atoms/form";
import { toast } from "sonner";
import { Switch } from "@/components/atoms/switch";
import { useStoreStore } from "@/stores/storeSlice";
import { getFeatureFlagForm } from "@iam-hussain/qd-copilot";
import { useEffect } from "react";
import instance from "@/lib/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function FeatureFlagForm() {
  const featureFlags = useStoreStore((state) => state.featureFlags);
  const featureFlagsFormData = getFeatureFlagForm(featureFlags);

  const form = useForm({
    defaultValues: featureFlags,
  });
  const {
    formState: { isDirty, isSubmitting },
  } = form;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables) =>
      instance.patch(`/store/feature-flags`, variables),
    onSuccess: async (data: any) => {
      form.reset(data);
      await queryClient.invalidateQueries({ queryKey: ["store"] });
      toast.success(`Store feature flags are updated successfully! 🚀`);
    },
    onError: () => {
      toast.error(
        `Unable to update store feature flags. Please review the entered information and try again. If the issue persists, contact support for further assistance.`
      );
    },
  });

  async function onSubmit(variables: any) {
    return await mutation.mutateAsync(variables);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Feature Flags</h3>
          <div className="space-y-4">
            {featureFlagsFormData.map((each) => (
              <FormField
                control={form.control}
                key={each.key}
                name={each.key}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{each.label}</FormLabel>
                      {each.info && (
                        <FormDescription
                          dangerouslySetInnerHTML={{
                            __html: each.info,
                          }}
                        />
                      )}
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          Save
        </Button>
      </form>
    </Form>
  );
}
