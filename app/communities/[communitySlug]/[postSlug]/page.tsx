import {CommunityPagePost} from "@/app/lib/db/post";
import prisma from "@/app/lib/db/prisma";
import OpenedPost from "@/app/communities/[communitySlug]/[postSlug]/OpenedPost";
import {redirect} from "next/navigation";

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

    if (!openedPost) {
        return redirect("/404");
    }

    return (
        <OpenedPost post={openedPost}/>
    )
}