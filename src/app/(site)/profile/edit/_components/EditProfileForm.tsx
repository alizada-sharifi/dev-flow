"use client";

import { CustomButton, CustomInput, CustomTextarea } from "@/components";
import { Form } from "@/components/ui/form";
import ROUTES from "@/constants/route";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/profile.schema";
import { UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EditProfileForm({ user }: { user: UserType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const onSubmit = async (data: ProfileSchemaType) => {
    startTransition(async () => {
      const result = await updateUser({
        name: data.name,
        username: data.username,
        portfolio: data.portfolio,
        location: data.location,
        bio: data.bio,
      });

      if (result.success) {
        toast.success("Your profile has been updated successfully.");
        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error(
          "There was an error updating your profile. Please try again."
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-9 flex w-full flex-col gap-9"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CustomInput
          control={form.control}
          name="name"
          required
          placeholder="Enter your name"
          label="Name"
        />

        <CustomInput
          control={form.control}
          name="username"
          required
          placeholder="Enter your username"
          label="Username"
        />

        <CustomInput
          control={form.control}
          name="portfolio"
          placeholder="Enter your portfolio link"
          label="Portfolio link"
          type="url"
        />

        <CustomInput
          control={form.control}
          name="location"
          placeholder="Where do you live?"
          label="Portfolio link"
        />

        <CustomTextarea
          control={form.control}
          name="bio"
          label="Bio"
          placeholder="What's special about you?"
        />

        <div className="flex mt-7 justify-end">
          <CustomButton type="submit" className="w-fit">
            {isPending ? (
              <>
                <Loader className="mr-2 size-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </CustomButton>
        </div>
      </form>
    </Form>
  );
}

export default EditProfileForm;
