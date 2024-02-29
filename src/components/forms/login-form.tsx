"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import schemas, { LoginSchemaValues } from "@/validations";
import { useRouter } from "next/navigation";
import instance from "@/lib/instance";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { cookieNames, setCookie } from "@/lib/cookies";
import { getValidationMessage } from "@/validations/messages";

const defaultValues: Partial<LoginSchemaValues> = {};

type LoginFormProps = {
  redirect: string;
};

function LoginForm({ redirect }: LoginFormProps) {
  const router = useRouter();
  const form = useForm<LoginSchemaValues>({
    resolver: zodResolver(schemas.login),
    defaultValues,
    mode: "onSubmit",
  });

  const { setError } = form;

  const mutation = useMutation({
    mutationFn: (variables) => instance.post("/auth/login", variables),
    onSuccess: (data: any) => {
      if (data?.access_token) {
        setCookie(cookieNames.access_token, data.access_token);
        if (data?.includes_store) {
          router.push("/store");
        } else {
          router.push("/stores");
        }
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

  async function onSubmit(variables: LoginSchemaValues) {
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
            disabled={mutation.isPending}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
