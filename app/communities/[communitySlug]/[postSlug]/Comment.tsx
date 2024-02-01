import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import Link from "next/link";
import {addComment, PostComment, setLike, unsetLike} from "@/app/lib/db/comment";
import {formatTimeAgo} from "@/app/lib/utils/formating";
import LikeButton from "@/app/communities/[communitySlug]/community/LikeButton";
import CommentsList from "@/app/communities/[communitySlug]/[postSlug]/CommentsList";
import {SessionUser} from "@/app/lib/db/user";
import AddCommentForm from "@/app/communities/[communitySlug]/[postSlug]/AddCommentForm";

interface CommentProps {
    comment: PostComment,
    getReplies: (id: string) => PostComment[],
    user: NonNullable<SessionUser>,
    isLikeSet: boolean,
}

export default function Comment({user, isLikeSet, comment, getReplies}: CommentProps) {

    return (

        <div className="w-full flex gap-2">
            <UserAvatar user={comment.creator} width={36} height={36}/>
            <div className="w-full">
                <div className="rounded-lg bg-base-100 px-2 pt-2 pb-3 w-full">
                    <div className="flex gap-2 items-center mb-1">
                        <Link href={`/users/${comment.creator.slug}`}
                              className="font-bold hover:underline text-sm">{comment.creator.name}</Link>
                        <p className="text-xs">{formatTimeAgo(comment.createdAt)}</p>
                    </div>
                    <p>{comment.content}</p>
                </div>
                <div className="flex gap-2 items-center mt-1 flex-wrap">
                    <LikeButton userId={user.id} postId={comment.id} isLikeSet={isLikeSet}
                                disabled={user.id === comment.creator.id}
                                unsetLike={unsetLike} setLike={setLike}
                                className="btn btn-ghost btn-circle btn-sm text-lg flex"/>
                    {comment._count.userLikes}
                    <AddCommentForm user={user} parentId={comment.id} postId={comment.postId} addComment={addComment}
                                    initialValue={comment.creator.name || ""}/>
                </div>
                <CommentsList comments={getReplies(comment.id)} getReplies={getReplies}/>
            </div>
        </div>

    )
}