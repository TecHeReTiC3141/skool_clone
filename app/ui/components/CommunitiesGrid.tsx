import { getMainPageCommunities } from "@/app/lib/db/community";
import CommunityCard from "@/app/ui/components/communities/CommunityCard";
import PaginationBar from "@/app/ui/components/PaginationBar";
import prisma from "@/app/lib/db/prisma";
import { COMMUNITIES_ON_PAGE } from "@/app/lib/params";

interface CommunitiesGridProps {
    page: number,
    filter: string | null,
}


export default async function CommunitiesGrid({ page, filter }: CommunitiesGridProps) {

    const communities = await getMainPageCommunities(page, filter);

    const totalCommunities = await prisma.community.count();

    console.log("filtering " + filter);

    return (
        <>
            <div
                className="mt-6 mb-8 w-full grid gap-x-16 justify-center gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {communities.map((community, index) => (
                    <CommunityCard community={community} index={index + (page - 1) * COMMUNITIES_ON_PAGE}
                                   key={community.id}/>
                ))}
            </div>
            <PaginationBar currentPage={page} totalEntries={totalCommunities} elementsOnPage={COMMUNITIES_ON_PAGE}/>
        </>
    )
}