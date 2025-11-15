import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export type CustomButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "ai";
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
    ai: "gap-1.5 rounded-md px-6 py-3 text-primary-500 shadow-md bg-light-400/50 dark:bg-dark-300 hover:bg-transparent sm:w-fit",
  };
  return (
    <Button
      type={type}
      variant={"ghost"}
      className={cn(
        "font-medium leading-[18px] cursor-pointer w-full",
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
