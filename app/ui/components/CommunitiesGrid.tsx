import {getAllCommunities} from "@/app/lib/db/community";
import CommunityCard from "@/app/ui/components/communities/CommunityCard";

export default async function CommunitiesGrid() {

    const communities = await getAllCommunities();

    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map(community => (
                <CommunityCard community={community} key={community.id} />
            ))}
        </div>
    )
}