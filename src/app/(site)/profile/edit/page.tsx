import { auth } from "@/auth";
import ROUTES from "@/constants/route";
import { getuser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

import React from "react";
import EditProfileForm from "./_components/EditProfileForm";
import { UserType } from "@/types";

async function EditProfile() {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.LOGIN);

  const { success, data } = await getuser({ userId: session.user.id });
  if (!success) redirect(ROUTES.LOGIN);

  return (
    <>
      <h1 className="h1-bold">Edit Profile</h1>

      <EditProfileForm user={data?.user as UserType} />
    </>
  );
}

export default EditProfile;
