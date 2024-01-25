"use client"

import {setLike, unsetLike} from "@/app/lib/db/post";
import clsx from "clsx";
import {SlLike} from "react-icons/sl";
import {useState} from "react";

interface LikeButtonProps {
    userId: string,
    postId: string,
    isLikeSet: boolean,
    disabled: boolean
}

export default function LikeButton({userId, postId, isLikeSet, disabled=false}: LikeButtonProps) {

    const [ isActive, setIsActive ] = useState<boolean>(isLikeSet);
    return (
        <button disabled={disabled} onClick={async () => {
            setIsActive(prevIsActive => !prevIsActive);
            await (isLikeSet ? unsetLike : setLike)(userId, postId);
        }} className={clsx(["btn btn-ghost btn-circle btn-sm text-lg", isActive && "text-yellow-300"])}><SlLike/></button>
    )
}