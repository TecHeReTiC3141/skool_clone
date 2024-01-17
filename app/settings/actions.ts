"use server"

import prisma from "@/app/lib/db/prisma";
import {UserSettings} from "@/app/lib/db/user";
import {revalidatePath} from "next/cache";


export async function updateUserSettings(id: string, updatedData: UserSettings) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("updating", id, updatedData);
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            ...updatedData,
        }
    });

    revalidatePath("/settings");
}