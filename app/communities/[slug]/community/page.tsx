import {checkIfUserInCommunity, getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import AddNewPost from "@/app/communities/[slug]/community/AddNewPost";

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

    return (
        <div>
            <AddNewPost user={session.user} community={community}/>
            Community posts will be here...
        </div>
    )
}