"use client";

import type {
  Control,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
  UseFormSetError,
  UseFormClearErrors,
  UseFormReturn,
} from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { TagCard } from "@/components";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  maxTags?: number;
}

function TagInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description = "Add tags and press Enter to add them",
  placeholder = "Add tags...",
  required = false,
  maxTags = 5,
}: Props<TFieldValues, TName>) {
  const methods = useFormContext<TFieldValues>() as UseFormReturn<TFieldValues>;
  const { setError, clearErrors } = methods as {
    setError: UseFormSetError<TFieldValues>;
    clearErrors: UseFormClearErrors<TFieldValues>;
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<TFieldValues, TName>
  ) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.currentTarget.value.trim();
    if (!value) return;

    const currentTags = (field.value as unknown as string[]) || [];

    if (value.length > 15) {
      setError(name, {
        type: "manual",
        message: "Each tag must be less than 15 characters",
      });
      return;
    }

    if (currentTags.includes(value)) {
      setError(name, {
        type: "manual",
        message: "This tag already exists",
      });
      return;
    }

    if (currentTags.length >= maxTags) {
      setError(name, {
        type: "manual",
        message: `You can only add up to ${maxTags} tags`,
      });
      return;
    }

    field.onChange([...currentTags, value]);
    e.currentTarget.value = "";
    clearErrors(name);
  };

  const handleTagRemove = (
    tag: string,
    field: ControllerRenderProps<TFieldValues, TName>
  ) => {
    const updated = ((field.value as unknown as string[]) || []).filter(
      (t) => t !== tag
    );
    field.onChange(updated);

    if (updated.length === 0) {
      setError(name, {
        type: "manual",
        message: "At least one tag is required",
      });
    } else {
      clearErrors(name);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          {label && (
            <FormLabel className="gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
              {label} {required && <span className="text-red-600">*</span>}
            </FormLabel>
          )}
          {description && (
            <FormDescription className="text-[10px]">
              {description}
            </FormDescription>
          )}

          <FormControl>
            <div>
              <Input
                placeholder={placeholder}
                className="w-full rounded-md p-3 sm:p-4 h-auto max-h-12 sm:max-h-[52px] text-sm sm:text-base leading-[18px] focus-within:ring-1 sm:focus-within:ring-1! focus-within:ring-primary-500! transition-all duration-200 font-medium border border-neutral-300 dark:border-gray-600"
                onKeyDown={(e) => handleInputKeyDown(e, field)}
              />

              {(field.value as string[])?.length > 0 && (
                <div className="flex flex-wrap mt-2.5 gap-2.5">
                  {(field.value as string[]).map((tag) => (
                    <TagCard
                      key={tag}
                      _id={tag}
                      name={tag}
                      compact
                      remove
                      isButton
                      handleRemove={() => handleTagRemove(tag, field)}
                    />
                  ))}
                </div>
              )}
            </div>
          </FormControl>

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default TagInput;
