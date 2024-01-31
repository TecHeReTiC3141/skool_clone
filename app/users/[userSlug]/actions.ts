"use server"

import prisma from "@/app/lib/db/prisma";

export type UserOfUserList = {
    id: string,
    name: string,
    slug: string,
    image: string,
    description: string
}

export async function getUserFollowers(userId: string): Promise<UserOfUserList[]> {
    const followers = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            followedBy: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    slug: true,
                    image: true,
                }
            }
        }
    });
    if (followers === null) {
        return [];
    }
    return followers.followedBy;
}

export async function getUserFollowing(userId: string): Promise<UserOfUserList[]> {
    const followers = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            following: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    slug: true,
                    image: true,
                }
            }
        }
    });
    if (followers === null) {
        return [];
    }
    return followers.following;
}