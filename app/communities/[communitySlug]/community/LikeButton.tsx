"use client"

import clsx from "clsx";
import {SlLike} from "react-icons/sl";
import React, {useEffect, useState} from "react";

interface LikeButtonProps {
    userId: string,
    postId: string,
    isLikeSet: boolean,
    disabled?: boolean,
    className: string,
    children?: React.ReactNode,
    unsetLike: (userId: string, postId: string) => Promise<void>,
    setLike: (userId: string, postId: string) => Promise<void>,
}

export default function LikeButton({userId, postId, isLikeSet, children, className, setLike, unsetLike, disabled=false}: LikeButtonProps) {

    const [ isActive, setIsActive ] = useState<boolean>(isLikeSet);

    useEffect(() => {
        setIsActive(isLikeSet);
    }, [isLikeSet]);


    return (
        <button disabled={disabled} onClick={async event => {
            event.stopPropagation();
            event.preventDefault();
            setIsActive(prevIsActive => !prevIsActive);
            await (isLikeSet ? unsetLike : setLike)(userId, postId);
        }} className={clsx([className, isActive && "text-yellow-300"])}><SlLike/> {children}</button>
    )
}