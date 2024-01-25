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

export type PostWithCommentsNumber = Post & { _count: { comments: number } };

export type PostWithLikesNumber = Post & { _count: { userLikes: number } };

export type CommunityPagePost = PostWithCreator & PostWithCommentsNumber & PostWithLikesNumber;

export async function getCommunityPosts(communityId: string): Promise<(CommunityPagePost)[]> {
    return await prisma.post.findMany({
        where: {communityId},
        include: {
            creator: true,
            _count: {
                select: {
                    comments: true,
                    userLikes: true,
                }
            }
        },
        orderBy: {createdAt: "desc"},
    });
}

export async function isLiked(userId: string, postId: string) {
    return !!await prisma.post.findUnique({
        where: {
            id: postId,
            userLikes: {
                some: {
                    id: userId,
                }
            }
        }
    })
}

export async function setLike(userId: string, postId: string) {
    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            userLikes: {connect: {id: userId}},
        }
    });
    revalidatePath("/communities/[slug]/community");
}

export async function unsetLike(userId: string, postId: string) {
    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            userLikes: {disconnect: {id: userId}},
        }
    });
    revalidatePath("/communities/[slug]/community");
}