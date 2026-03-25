import User from "@/models/user.model";
import connectDB from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const existingUser = await User.findOne({ clerkId: user.id });
    if (!existingUser) {
      await User.create({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      });
      return NextResponse.json(
      { user: existingUser },
      { status: 200 }
    );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `user authentication error ${error}` },
      { status: 500 },
    );
  }
}
