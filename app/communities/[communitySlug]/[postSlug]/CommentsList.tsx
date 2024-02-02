"use client"

import {PostComment} from "@/app/lib/db/comment";
import Comment from "@/app/communities/[communitySlug]/[postSlug]/Comment";
import {SessionUser} from "@/app/lib/db/user";
import {CommentsByParentId} from "@/app/communities/[communitySlug]/[postSlug]/OpenedPost";

interface OpenedPostCommentsProps {
    comments: PostComment[],
    commentByParentId: CommentsByParentId,
    user: NonNullable<SessionUser>,
}

export default function CommentsList({comments, commentByParentId, user}: OpenedPostCommentsProps) {
    if (!comments) {
        return (<div></div>);
    }

    return (
        <div className="w-full flex flex-col gap-4 mt-2">
            {comments.map(async (comment) =>
                (<Comment user={user} isLikeSet={comment.isLikeSet!} comment={comment} commentByParentId={commentByParentId}
                          key={comment.id}/>))
            }
        </div>
    )

}