"use client"

import {setLike, unsetLike} from "@/app/lib/db/post";
import clsx from "clsx";
import {SlLike} from "react-icons/sl";
import React, {useEffect, useState} from "react";

interface LikeButtonProps {
    userId: string,
    postId: string,
    isLikeSet: boolean,
    disabled: boolean,
    className: string,
    children?: React.ReactNode
}

export default function LikeButton({userId, postId, isLikeSet, children, className, disabled=false}: LikeButtonProps) {

    const [ isActive, setIsActive ] = useState<boolean>(isLikeSet);

    useEffect(() => {
        setIsActive(isLikeSet);
    }, [isLikeSet]);

    return (
        <button disabled={disabled} onClick={async event => {
            event.stopPropagation();
            setIsActive(prevIsActive => !prevIsActive);
            await (isLikeSet ? unsetLike : setLike)(userId, postId);
        }} className={clsx([className, isActive && "text-yellow-300"])}><SlLike/> {children}</button>
    )
}