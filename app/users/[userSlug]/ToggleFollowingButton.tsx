"use client"

import {followUser, unfollowUser} from "@/app/lib/db/user";
import clsx from "clsx";

interface ToggleFollowingButtonProps {
    isFollowing: boolean | null,
    currentUserId: string | undefined,
    profileUserId: string,
}

export default function ToggleFollowingButton({isFollowing, currentUserId, profileUserId}: ToggleFollowingButtonProps) {

    if (isFollowing === null || !currentUserId) {
        return (
            <button disabled className="btn btn-primary btn-block uppercase mb-3">Follow</button>
        )
    }


    return (
        <button className={clsx(["btn btn-block uppercase mb-3", isFollowing ? "btn-base-100" : "btn-primary"])}
                onClick={async ev => {
            await (isFollowing ? unfollowUser : followUser)(currentUserId, profileUserId);
        }}>{isFollowing ? "Following" : "Follow"}</button>
    )
}