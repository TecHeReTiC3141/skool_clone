import prisma from "@/app/lib/db/prisma";
import {User} from "@prisma/client";

import slugify from "slugify";
import bcrypt from "bcrypt"

interface UserCredentials {
    name: string,
    email: string,
    password: string,
}

export async function createUser({name, email, password}: UserCredentials): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const slug = slugify(name + '-' + Math.round(Math.random() * 10000), {lower: true,});
    return await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            slug,
        }
    });
}