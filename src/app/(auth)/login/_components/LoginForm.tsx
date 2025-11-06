"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginFormData } from "@/schemas/login.schema";
import { Form } from "@/components/ui/form";
import { CustomButton, CustomInput } from "@/components";
import ROUTES from "@/constants/route";

export default function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = (data: LoginFormData) => console.log(data);

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
          <CustomInput
            control={form.control}
            name={"email"}
            label="Email"
            required
            placeholder="Enter your email"
          />

          <CustomInput
            control={form.control}
            name={"password"}
            label="Password"
            required
            placeholder="Enter your password"
            type="password"
          />

          <CustomButton className="py-5" type="submit">
            Sign in
          </CustomButton>
        </form>
      </Form>
      <p className="mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTES.SIGNUP}
          className="primary-text-gradient font-semibold"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
