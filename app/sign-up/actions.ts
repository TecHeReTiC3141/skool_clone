"use server"

import {createUser} from "@/app/lib/db/user";
import {SignInResponse} from "next-auth/react";
import {redirect} from "next/navigation";

export async function signUpUser(formData: FormData): Promise<SignInResponse | undefined> {

    await createUser({
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
    });

    return redirect("/login");
}