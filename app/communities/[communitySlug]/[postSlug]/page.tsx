import {CommunityPagePost, getPostComments, PostComments} from "@/app/lib/db/post";
import prisma from "@/app/lib/db/prisma";

interface CommunityPostProps {
    params: {
        postSlug: string,
    }
}

export default async function CommunityPostPage({params: {postSlug}}: CommunityPostProps) {

    const openedPost: CommunityPagePost | null = await prisma.post.findUnique({
        where: {
            slug: postSlug,
        },
        include: {
            creator: true,
            _count: {
                select: {
                    comments: true,
                    userLikes: true,
                }
            }
        }
    });
    let openedPostComments: PostComments | null;
    if (openedPost) {
        openedPostComments = await getPostComments(openedPost.id);
        console.log("comments tree", openedPostComments)
    }

    return (
        <div>{postSlug}</div>
    )
}