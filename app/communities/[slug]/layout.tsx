import {getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import CommunityInfoCard from "@/app/communities/[slug]/CommunityInfoCard";
import React from "react";

interface CommunityLayoutProps {
    params: {
        slug: string,
    },
    children: React.ReactNode,
}

export default async function CommunityPageLayout({children, params: {slug}}: CommunityLayoutProps) {

    const community = await getCommunityFromSlug(slug);

    if (!community) {
        return redirect("/404");
    }

    return (
        <div className="max-w-6xl flex justify-between items-start w-full gap-6 mt-12 m-auto">
            <div className="w-full">
                {children}
            </div>
            <CommunityInfoCard community={community}/>
        </div>
    )
}