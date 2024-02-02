import { checkIfUserInCommunity, getCommunityFromSlug } from "@/app/lib/db/community";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/config/authOptions";
import AddNewPost from "@/app/communities/[communitySlug]/community/AddNewPost";
import { CommunityPagePost, getCommunityPosts, isPostLiked } from "@/app/lib/db/post";
import PostCard from "@/app/communities/[communitySlug]/community/PostCard";
import PaginationBar from "@/app/ui/components/PaginationBar";
import prisma from "@/app/lib/db/prisma";
import OpenedPost from "@/app/communities/[communitySlug]/[postSlug]/OpenedPost";
import Link from "next/link";

interface CommunityAboutPageProps {
    params: {
        communitySlug: string,
    },
    searchParams: {
        page: string,
        openedPostSlug?: string,
    }
}

export default async function CommunityAboutPage({ params: { communitySlug }, searchParams: { page = "1", openedPostSlug } }: CommunityAboutPageProps) {

    const currentPage = +page;
    console.log("in about page", communitySlug, currentPage);
    const community = await getCommunityFromSlug(communitySlug);

    if (!community) {
        return redirect("/404");
    }

    const session = await getServerSession(authOptions);


    if (!session || !(await checkIfUserInCommunity(session.user.id, community.id))) {
        return redirect("./about?notmember=true");
    }

    const posts = await getCommunityPosts(community.id, currentPage);

    const totalPosts = await prisma.post.count({
        where: {
            communityId: community.id,
        },
    });

    let openedPost: CommunityPagePost | null = null;

    if (openedPostSlug) {
        openedPost = await prisma.post.findUnique({
            where: {
                slug: openedPostSlug,
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
    }

    return (
        <>
            <AddNewPost user={session.user} community={community}/>
            {posts.length > 0 ? <div className="w-full flex flex-col gap-6"> {posts.map(async post => (
                    <PostCard user={session.user} isLikeSet={await isPostLiked(session.user.id, post.id)} post={post}
                              key={post.id}/>
                ))} </div>
                : <p>There are no posts yet, create first!</p>}
            <PaginationBar currentPage={currentPage} totalPosts={totalPosts}/>
            {openedPost && <div className="modal modal-open">
                <div className="modal-box bg-neutral absolute top-4 h-[95%] overflow-x-hidden max-w-2xl">
                    <OpenedPost post={openedPost}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <Link href={`/communities/${communitySlug}/community`}></Link>
                </form>
            </div>
            }
        </>
    )
}