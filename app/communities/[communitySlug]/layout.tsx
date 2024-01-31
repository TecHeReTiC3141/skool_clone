import {getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import CommunityInfoCard from "@/app/communities/[communitySlug]/CommunityInfoCard";
import React from "react";

interface CommunityLayoutProps {
    params: {
        communitySlug: string,
    },
    children: React.ReactNode,
}

export default async function CommunityPageLayout({children, params: {communitySlug}}: CommunityLayoutProps) {

    const community = await getCommunityFromSlug(communitySlug);

    if (!community) {
        return redirect("/404");
    }

    return (
        <div className="max-w-6xl flex flex-col-reverse sm:flex-row justify-between items-start w-full gap-6 md:gap-12 mt-12 m-auto">
            <div className="w-full">
                {children}
            </div>
            <CommunityInfoCard community={community}/>
        </div>
    )
}