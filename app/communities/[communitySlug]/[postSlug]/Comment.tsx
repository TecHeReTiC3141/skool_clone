import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import Link from "next/link";
import {PostComment} from "@/app/lib/db/comment";

interface CommentProps {
    comment: PostComment,
    getReplies: (id: string) => PostComment[],
}

export default async function Comment({comment, getReplies}: CommentProps) {

    return (
        <div className="w-full flex gap-2">
            <UserAvatar user={comment.creator} width={36} height={36}/>
            <div className="rounded-lg bg-base-100 p-2 w-full">
                <Link href={`/users/${comment.creator.slug}`} className="font-bold hover:underline">{comment.creator.name}</Link>
                <p>{comment.content}</p>
            </div>
        </div>
    )
}