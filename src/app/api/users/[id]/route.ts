import { NextResponse } from "next/server";

import User from "@/database/user.model";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/schemas/user.schema";

import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import { APiErrorResponse } from "@/types";

type paramsType = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: paramsType) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    await dbConnect();

    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APiErrorResponse;
  }
}

export async function DELETE(_: Request, { params }: paramsType) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APiErrorResponse;
  }
}

export async function PUT(request: Request, { params }: paramsType) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    await dbConnect();

    const body = await request.json();
    const validatedData = UserSchema.partial().parse(body);

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APiErrorResponse;
  }
}
