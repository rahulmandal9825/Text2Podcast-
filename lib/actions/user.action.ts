"use server";



import { createUserParams, UpdateUserparams } from "@/types";
import { connectTodb } from "../database/mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";



export async function creatUser(user: createUserParams) {
    try {
        await connectTodb();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
      return { error: "Can not create user" }
    }

}

export async function getUserbyId(userId: string) {
    try {
        await connectTodb();

        const user = await User.findOne({ clerkId: userId })
        if (!user) throw new Error("user not found");

        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        console.log(error);
        return { error: " something went wrong" };
    }
}

export async function updateUser(clerkId: string, user: UpdateUserparams) {
    try {
        await connectTodb();

        const updateUser = await User.findByIdAndUpdate({ clerkId }, user, {
            new: true,
        });

        if (!updateUser) throw new Error("user update failed");
        return JSON.parse(JSON.stringify(updateUser));
    } catch (error) {
        console.log(error);
        return { error: " something went wrong" };
    }
}


export async function deleteUser(clerkId: string | undefined) {
    try {
        await connectTodb();
        const usertodelete = await User.findOne({ clerkId });
        if (!usertodelete) {
            throw new Error("user not found");
        }
        const deleteUser = await User.findByIdAndDelete(usertodelete._id);

        revalidatePath("/");
        return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null;
    } catch (error) {
        console.log(error);
        return { error: " failed to delete user" }
    }
}