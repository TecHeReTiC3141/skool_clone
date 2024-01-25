"use client"

import {setLike, unsetLike} from "@/app/lib/db/post";
import clsx from "clsx";
import {SlLike} from "react-icons/sl";
import React, {useState} from "react";

interface LikeButtonProps {
    userId: string,
    postId: string,
    isLikeSet: boolean,
    disabled: boolean,
    children?: React.ReactNode
}

export default function LikeButton({userId, postId, isLikeSet, children, disabled=false}: LikeButtonProps) {

    const [ isActive, setIsActive ] = useState<boolean>(isLikeSet);
    return (
        <button disabled={disabled} onClick={async event => {
            event.stopPropagation();
            setIsActive(prevIsActive => !prevIsActive);
            await (isLikeSet ? unsetLike : setLike)(userId, postId);
        }} className={clsx(["btn btn-ghost btn-circle btn-sm text-lg flex", isActive && "text-yellow-300"])}><SlLike/> {children}</button>
    )
}