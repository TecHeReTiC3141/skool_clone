import {getMainPageCommunities} from "@/app/lib/db/community";
import CommunityCard from "@/app/ui/components/communities/CommunityCard";

export default async function CommunitiesGrid() {

    const communities = await getMainPageCommunities();

    return (
        <div className="mt-6 mb-8 max-w-5xl mx-auto grid gap-x-16 justify-center gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((community, index) => (
                <CommunityCard community={community} index={index} key={community.id} />
            ))}
        </div>
    )
}