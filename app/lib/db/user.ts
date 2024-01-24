"use server"

import prisma from "@/app/lib/db/prisma";
import {User} from "@prisma/client";

import slugify from "slugify";
import bcrypt from "bcrypt"
import {revalidatePath} from "next/cache";
import {CommunityMembershipData} from "@/app/lib/db/community";

interface UserCredentials {
    name: string,
    email: string,
    password: string,
}

export interface UserSettings {
    name: string,
    description: string,
}

export type SessionUser =
    {
        id: string,
        slug: string
    } & {
    name?: string | null | undefined,
    email?: string | null | undefined,
    image?: string | null | undefined
} | undefined;

export type UserWithCommunities = User & {communities: { community: CommunityMembershipData}[]}

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

export async function updateUserImage(id: string, newUrl: string) {
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            image: newUrl,
        }
    });
    revalidatePath("/settings");
}

export async function getUserBySlug(slug: string): Promise<UserWithCommunities | null> {
    return await prisma.user.findUnique({
        where: {
            slug,
        },
        include: {
            communities: {
                include: {
                    community: {
                        select: {
                            name: true,
                            icon: true,
                            accessLevel: true,
                            slug: true,
                            _count: {
                                select: {
                                    members: true,
                                }
                            }

                        },
                    }

                }
            }
        }
    });
}