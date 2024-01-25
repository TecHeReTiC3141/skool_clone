"use server"
import prisma from "@/app/lib/db/prisma";
import {revalidatePath} from "next/cache";
import {Post, User} from "@prisma/client";

export interface PostCreateData {
    title?: string,
    content: string,
    creatorId: string,
    communityId: string,
}

export async function createPost({title, content, creatorId, communityId}: PostCreateData) {
    await prisma.post.create({
        data: {
            title,
            content,
            creatorId,
            communityId,
        }
    });
    revalidatePath("/communities/[slug]/community");
}

export type PostWithCreator = Post & { creator: User };

export type PostWithCommentsNumber = Post & {_count: { comments: number }};

export async function getCommunityPosts(communityId: string): Promise<(PostWithCreator & PostWithCommentsNumber)[]> {
    return await prisma.post.findMany({
        where: { communityId },
        include: {
            creator: true,
            _count: {
                select: {
                    comments: true,
                }
            }
        },
        orderBy: { createdAt: "desc" },
    });
}