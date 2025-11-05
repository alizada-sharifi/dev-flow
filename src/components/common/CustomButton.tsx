import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export type CustomButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

function CustomButton({
  variant = "primary",
  children,
  className,
  type = "button",
  ...props
}: CustomButtonProps) {
  const buttonVariant = {
    primary: "primary-gradient hover:primary-gradient/50 px-4 py-3 rounded-md ",
    secondary: "bg-light-800 dark:bg-dark-400 rounded-md py-3",
    tertiary:
      "bg-light-700 dark:bg-dark-400 border-light-700 dark:border-dark-400 border px-4 py-3 rounded-lg",
  };
  return (
    <Button
      type={type}
      variant={"ghost"}
      className={cn(
        "font-medium leading-[18px] cursor-pointer",
        buttonVariant[variant],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
