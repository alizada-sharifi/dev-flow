"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { CustomButton, CustomInput } from "@/components";
import ROUTES from "@/constants/route";
import { SignUpSchema } from "@/schemas/sign-up.schema";
import type { SignUpFormData } from "@/schemas/sign-up.schema";

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = (data: SignUpFormData) => console.log(data);

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
          <CustomInput
            control={form.control}
            name={"name"}
            label="Name"
            required
            placeholder="Enter your name"
          />

          <CustomInput
            control={form.control}
            name={"username"}
            label="Username"
            required
            placeholder="Enter your username"
          />

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
            Sign Up
          </CustomButton>
        </form>
      </Form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="primary-text-gradient font-semibold"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
