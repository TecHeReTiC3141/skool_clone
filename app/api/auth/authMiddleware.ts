"use server"

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import {redirect} from "next/navigation";

export async function checkAuthenticated() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/login");
    }
    return session.user;
}