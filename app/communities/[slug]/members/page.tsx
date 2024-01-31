import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import {checkIfUserInCommunity, getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import MemberFilters from "@/app/communities/[slug]/members/MemberFilters";
import CommunityMemberList from "@/app/communities/[slug]/members/CommunityMemberList";
import {
    CommunityMembersListData,
    getAllCommunityMembers,
    getCommunityAdmins,
    getCommunityMemberCounts,
    getCommunityMembers
} from "@/app/communities/[slug]/members/actions";

interface CommunityMembersPageProps {
    params: {
        slug: string,
    },
    searchParams: {
        t?: string,
    }
}


export default async function CommunityMembersPage({params: {slug}, searchParams: {t = "member"}}: CommunityMembersPageProps) {
    const session = await getServerSession(authOptions);

    const community = await getCommunityFromSlug(slug);

    if (!community) {
        return redirect("/404");
    }

    if (!session || !(await checkIfUserInCommunity(session.user.id, community.id))) {
        return redirect("./about?notmember=true");
    }

    let users: CommunityMembersListData | null = await (t === "member" ? getCommunityMembers :
        t === "admin" ? getCommunityAdmins : getAllCommunityMembers)(slug);

    console.log("memberss", users);

    const memberCounts = await getCommunityMemberCounts(community.id);

    console.log(memberCounts);

    return (
        <div>
            <MemberFilters memberCount={memberCounts.MEMBER} adminsCount={memberCounts.ADMIN}/>
            <CommunityMemberList users={users?.members || []}/>
        </div>
    )
}