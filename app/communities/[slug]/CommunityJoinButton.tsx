"use client"

import {addUserToCommunity} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import {SessionUser} from "@/app/lib/db/user";
import {Community} from "@prisma/client";

interface CommunityJoinButtonProps {
    user: SessionUser,
    community: Community,
}

export default function CommunityJoinButton({user, community}: CommunityJoinButtonProps) {
    return (
        <button className="btn btn-block btn-primary uppercase" onClick={async () => {
            if (user) {
                await addUserToCommunity(user.id, community.id, community.slug);
            } else {
                return redirect("/login");
            }
        }}>Join group</button>
    )
}