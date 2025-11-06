import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentProps<"input"> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
  inputClassName?: string;
}

function CustomInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  placeholder = "Enter value",
  type = "text",
  containerClassName,
  labelClassName,
  required = false,
  inputClassName,
  ...rest
}: Props<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(containerClassName)}>
          {label && (
            <FormLabel
              className={cn(
                labelClassName,
                "gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0"
              )}
            >
              {label}
              {required && <span className="text-red-600">*</span>}
            </FormLabel>
          )}
          {description && <FormDescription>{description}</FormDescription>}

          <FormControl>
            <Input
              className={cn(
                "w-full rounded-md p-3 sm:p-4 h-auto max-h-12 sm:max-h-[52px] text-sm sm:text-base leading-[18px] focus-within:ring-1 sm:focus-within:ring-1! focus-within:ring-primary-500! transition-all duration-200 font-medium border border-neutral-300 dark:border-gray-600",
                inputClassName
              )}
              placeholder={placeholder}
              type={type}
              {...field}
              {...rest}
            />
          </FormControl>

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
