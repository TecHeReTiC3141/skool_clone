import {checkIfUserInCommunity, getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import AddNewPost from "@/app/communities/[slug]/community/AddNewPost";
import {getCommunityPosts} from "@/app/lib/db/post";
import PostCard from "@/app/communities/[slug]/community/PostCard";
import PaginationBar from "@/app/communities/[slug]/community/PaginationBar";
import prisma from "@/app/lib/db/prisma";

interface CommunityAboutPageProps {
    params: {
        slug: string,
        post?: string,
    },
    searchParams: {
        page: string,
    }
}
export default async function CommunityAboutPage({params: {slug, post}, searchParams: {page = "1"}}: CommunityAboutPageProps) {

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
        where: {communityId: community.id},
    });

    return (
        <>
            <AddNewPost user={session.user} community={community}/>
            {posts.length > 0 ? <div className="w-full flex flex-col gap-6"> {posts.map(post => (
                    <PostCard user={session.user} communitySlug={community.slug} post={post} key={post.id}/>
                ))} </div>
            : <p>There are no posts yet, create first!</p>}
            <PaginationBar currentPage={currentPage} totalPosts={totalPosts}/>
        </>
    )
}