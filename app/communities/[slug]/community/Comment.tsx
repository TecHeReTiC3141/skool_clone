"use client"

import {Post} from "@prisma/client";
import UserAvatar from "@/app/users/[slug]/UserAvatar";
import {SessionUser} from "@/app/lib/db/user";
import Link from "next/link";

interface CommentProps {
    comment: Post,
    user: NonNullable<SessionUser>,
    level: number,
}

export default function Comment({user, comment, level}: CommentProps) {
    return (
        <div className="w-full flex gap-2">
            <UserAvatar user={user} width={36} height={36}/>
            <div className="rounded-lg bg-base-100 p-2 w-full">
                <Link href={`/users/${user.slug}`} className="font-bold hover:underline">{user.name}</Link>
                <p>{comment.content}</p>
            </div>
        </div>
    )
}