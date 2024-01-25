import {checkIfUserInCommunity, getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import AddNewPost from "@/app/communities/[slug]/community/AddNewPost";
import {getCommunityPosts} from "@/app/lib/db/post";
import PostCard from "@/app/communities/[slug]/community/PostCard";

interface CommunityAboutPageProps {
    params: {
        slug: string,
    },
}
export default async function CommunityAboutPage({params: {slug}}: CommunityAboutPageProps) {
    console.log("in about page", slug);
    const community = await getCommunityFromSlug(slug);

    if (!community) {
        return redirect("/404");
    }

    const session = await getServerSession(authOptions);


    if (!session || !(await checkIfUserInCommunity(session.user.id, community.id))) {
        return redirect("./about?notmember=true");
    }

    const posts = await getCommunityPosts(community.id);
    console.log(posts);

    return (
        <div>
            <AddNewPost user={session.user} community={community}/>
            {posts.length > 0 ? <div className="w-full flex flex-col gap-6"> {posts.map(post => (
                    <PostCard post={post} key={post.id}/>
                ))} </div>
            : <p>There are no posts yet, create first!</p>}
        </div>
    )
}