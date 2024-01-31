"use server"
import prisma from "@/app/lib/db/prisma";
import {revalidatePath} from "next/cache";
import {Post, Prisma, User} from "@prisma/client";
import {POSTS_ON_PAGE} from "@/app/lib/params";
import slugify from "slugify";

export interface PostCreateData {
    title: string,
    content: string,
    creatorId: string,
    communityId: string,
}

export async function createPost({title, content, creatorId, communityId}: PostCreateData) {
    const slug = slugify(title + "-" + Math.round(Math.random() * 10000), { lower: true });
    await prisma.post.create({
        data: {
            title,
            slug,
            content,
            creatorId,
            communityId,
        }
    });
    revalidatePath("/communities/[communitySlug]/community", "page");
}

export type PostWithCreator = Post & { creator: User };

export type PostWithCommentsNumber = Post & { _count: { comments: number } };

export type PostWithLikesNumber = Post & { _count: { userLikes: number } };

export type CommunityPagePost = PostWithCreator & PostWithCommentsNumber & PostWithLikesNumber;

export async function getCommunityPosts(communityId: string, page: number ): Promise<(CommunityPagePost)[]> {
    return await prisma.post.findMany({
        where: {
            communityId,
            answeredPost: null,
        },
        include: {
            creator: true,
            _count: {
                select: {
                    comments: true,
                    userLikes: true,
                }
            }
        },
        skip: (page - 1) * POSTS_ON_PAGE,
        take: POSTS_ON_PAGE,
        orderBy: {createdAt: "desc"},
    });
}

// LIKES

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
    revalidatePath("/communities/[communitySlug]/community", "page");
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
    revalidatePath("/communities/[communitySlug]/community", "page");
}

// COMMENTS
export interface CommentCreateData {
    answeredPostId: string,
    content: string,
    creatorId: string,
    communityId: string,
}

export async function addComment({answeredPostId, content, communityId, creatorId}: CommentCreateData) {
    const slug = slugify(content + "-" + Math.round(Math.random() * 10000), { lower: true });
    await prisma.post.create({
        data: {
            slug,
            content,
            creator: { connect: { id: creatorId }},
            community: { connect: { id: communityId }},
            answeredPost: { connect: { id: answeredPostId}}
        }
    });
    revalidatePath("/communities/[communitySlug]/community", "page");
}

export type PostComments = { id: string, comments: PostComments[] } ;

function includeNestedCategories(
    maximumLevel: number,
): boolean | Prisma.Post$commentsArgs {
    if (maximumLevel === 1) {
        return true;
    }
    return {
        select: {
            id: true,
            comments: includeNestedCategories(maximumLevel - 1),
        },
    };
}

export async function getPostComments(postId: string): Promise<PostComments | null> {
    return await prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            id: true,
            comments: includeNestedCategories(5),
        }
    });
}

export async function getComment(commentId: string): Promise<(PostWithCreator & PostWithLikesNumber) | null> {
    return await prisma.post.findUnique({
        where: {
            id: commentId,
        },
        include: {
            creator: true,
            _count: {
                select: {
                    userLikes: true,
                }
            }
        }
    })
}