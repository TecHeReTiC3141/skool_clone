import {checkIfUserInCommunity, getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import AddNewPost from "@/app/communities/[slug]/community/AddNewPost";
import {CommunityPagePost, getCommunityPosts, getPostComments, isLiked, PostComments} from "@/app/lib/db/post";
import PostCard from "@/app/communities/[slug]/community/PostCard";
import PaginationBar from "@/app/communities/[slug]/community/PaginationBar";
import prisma from "@/app/lib/db/prisma";
import OpenedPost from "@/app/communities/[slug]/community/OpenedPost";

interface CommunityAboutPageProps {
    params: {
        slug: string,
    },
    searchParams: {
        page: string,
        openedPostSlug?: string,
    }
}

export default async function CommunityAboutPage({params: {slug}, searchParams: {page = "1", openedPostSlug}}: CommunityAboutPageProps) {

    const currentPage = +page;
    console.log("in about page", slug, currentPage);
    const community = await getCommunityFromSlug(slug);

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
            answeredPost: null,
        },
    });

    let openedPost: CommunityPagePost | null = null, openedPostComments: PostComments | null = null;

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
        if (openedPost) {
            openedPostComments = await getPostComments(openedPost.id);
            console.log("comments tree", openedPostComments)
        }
    }

    console.log("page rerendered");

    return (
        <>
            <AddNewPost user={session.user} community={community}/>
            {posts.length > 0 ? <div className="w-full flex flex-col gap-6"> {posts.map(async post => (
                    <PostCard user={session.user} isLikeSet={await isLiked(session.user.id, post.id)} post={post}
                              key={post.id}/>
                ))} </div>
                : <p>There are no posts yet, create first!</p>}
            <PaginationBar currentPage={currentPage} totalPosts={totalPosts}/>
            {openedPost && openedPostComments && <OpenedPost user={session.user} isLikeSet={await isLiked(session.user.id, openedPost.id)}
                                       post={openedPost} postComments={openedPostComments}/>}
        </>
    )
}