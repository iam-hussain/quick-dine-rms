"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  formValidationSetter,
  SignInSchema,
  SignInSchemaType,
} from "@iam-hussain/qd-copilot";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

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
import { cookieNames, setCookieAsync } from "@/lib/cookies";
import fetcher from "@/lib/fetcher";

const defaultValues: Partial<SignInSchemaType> = {
  email: "",
  password: "",
};

function LoginForm() {
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const {
    setError,
    formState: { isDirty, isSubmitting },
  } = form;

  const mutation = useMutation({
    mutationFn: (variables) =>
      fetcher.post("/authentication/sign-in", variables),
    onSuccess: async (data: any) => {
      if (data?.access_token) {
        await setCookieAsync(cookieNames.access_token, data.access_token);
        if (data?.includes_store) {
          router.history.push("/store");
        } else {
          router.history.push("/stores");
        }
      }
    },
    onError: (err) => formValidationSetter(err, setError),
  });

  async function onSubmit(variables: SignInSchemaType) {
    return await mutation.mutateAsync(variables as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Slug</FormLabel>
              <FormControl>
                <Input placeholder="aaa-canteen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <Button
            className="w-full"
            type="submit"
            disabled={!isDirty || isSubmitting || mutation.isPending}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
