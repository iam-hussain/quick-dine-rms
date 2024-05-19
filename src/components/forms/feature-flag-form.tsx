"use client";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
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
import { getFeatureFlagForm } from "@iam-hussain/qd-copilot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/lib/fetcher";
import Loader from "../molecules/loader";

export function FeatureFlagForm() {
  const featureFlags = useSelector(
    (state: RootState) => state.base.featureFlags
  );

  const featureFlagsFormData = getFeatureFlagForm(featureFlags);

  const form = useForm({
    defaultValues: featureFlags,
  });

  const {
    formState: { isDirty, isSubmitting },
  } = form;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables) => fetcher.patch(`/store/feature-flags`, variables),
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm gap-2">
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
        <Button
          className="md:w-auto w-full"
          type="submit"
          disabled={!isDirty || isSubmitting || mutation.isPending}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
