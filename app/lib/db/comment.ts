"use server"

import slugify from "slugify";
import prisma from "@/app/lib/db/prisma";
import {revalidatePath} from "next/cache";
import {Comment, User} from "@prisma/client";

// COMMENTS
export interface CommentCreateData {
    answeredPostId: string,
    content: string,
    creatorId: string,
}

export async function addComment({answeredPostId, content, creatorId}: CommentCreateData) {
    const slug = slugify(content + "-" + Math.round(Math.random() * 10000), { lower: true });
    await prisma.comment.create({
        data: {
            content,
            creator: { connect: { id: creatorId }},
            post: { connect: { id: answeredPostId}}
        }
    });
    revalidatePath("/communities/[communitySlug]/community", "page");
}

export type CommentWithCreator = Comment & { creator: User };

export type CommentWithLikesCount = Comment & { _count: { userLikes: number } };

export type PostComment = CommentWithCreator & CommentWithLikesCount;

export type PostComments = { comments: PostComment[]};

export async function getPostComments(postId: string): Promise<PostComments> {
    return (await prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            comments: {
                include: {
                    creator: true,
                    _count: {
                        select: {
                            userLikes: true,
                        }
                    }
                }
            }
        }
    }))!;
}