import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import Link from "next/link";
import {
    addComment,
    deleteComment,
    PostComment,
    setCommentLike,
    unsetCommentLike,
    updateComment
} from "@/app/lib/db/comment";
import { formatTimeAgo } from "@/app/lib/utils/formating";
import LikeButton from "@/app/communities/[communitySlug]/community/LikeButton";
import CommentsList from "@/app/communities/[communitySlug]/[postSlug]/CommentsList";
import { SessionUser } from "@/app/lib/db/user";
import AddCommentForm from "@/app/communities/[communitySlug]/[postSlug]/AddCommentForm";
import clsx from "clsx";
import { BsThreeDots } from "react-icons/bs";
import { CommentsByParentId } from "@/app/communities/[communitySlug]/[postSlug]/OpenedPost";
import { Suspense, useState } from "react";
import { closeDropdown } from "@/app/lib/utils/DOMmanipulations";
import UpdateCommentForm from "@/app/communities/[communitySlug]/[postSlug]/UpdateCommentForm";

interface CommentProps {
    comment: PostComment,
    commentByParentId: CommentsByParentId,
    user: NonNullable<SessionUser>,
    isLikeSet: boolean,
}

export default function Comment({ user, isLikeSet, comment, commentByParentId }: CommentProps) {

    const isOwner = user.id === comment.creator.id;

    const [ isEditing, setIsEditing ] = useState(false);
    const [ isReplying, setIsReplying ] = useState(false);

    return (

        <div className="w-full flex gap-2">
            <UserAvatar user={comment.creator} width={36} height={36}/>
            {isEditing ? <div className="w-full">
                    <UpdateCommentForm closeEditing={() => setIsEditing(false)} updateComment={updateComment}
                                       commentId={comment.id} user={user} initialValue={comment.content}/>
                    <CommentsList user={user} comments={commentByParentId[ comment.id ]}
                                  commentByParentId={commentByParentId}/>
                </div> :
                <div className="w-full">
                    <div className={clsx([ "relative rounded-lg px-2 pt-2 pb-3 w-full",
                        isOwner ? "bg-primary text-primary-content" : "bg-base-200 text-base-content" ])}>
                        <div className="flex gap-2 items-center mb-1">
                            <Link href={`/users/${comment.creator.slug}`}
                                  className="font-bold hover:underline text-sm">{comment.creator.name}</Link>
                            <p className="text-xs">{formatTimeAgo(comment.createdAt)}</p>
                        </div>
                        <p>{comment.content}</p>
                        <div className="dropdown dropdown-end  absolute right-2 top-2">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-xs p-1 rounded-full">
                                <BsThreeDots
                                    className="text-lg"/></div>
                            <ul tabIndex={0} onClick={() => closeDropdown()}
                                className="dropdown-content bg-neutral text-neutral-content z-[1] menu p-2 shadow rounded-box w-52">
                                {isOwner && <>
                                    <li>
                                        <button onClick={() => setIsEditing(prev => !prev)}>Edit</button>
                                    </li>
                                    <li>
                                        <button onClick={() => {
                                            const dialog = document.getElementById(`delete-${comment.id}`) as HTMLDialogElement;
                                            dialog.showModal();
                                        }
                                        }>Delete
                                        </button>
                                        <dialog id={`delete-${comment.id}`} className="modal">
                                            <div
                                                className="modal-box absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                                                <h3 className="font-bold text-lg">Delete comment?</h3>
                                                <p className="py-4">Are you sure to delete this comment, this actions
                                                    can&apos;t be undone</p>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Cancel</button>
                                                        <button className="btn btn-warning"
                                                                onClick={async () => await deleteComment(comment.id)}>Delete
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>
                                    </li>
                                </>}
                                <li>
                                    <div>Copy the link</div>
                                </li>
                                <li>
                                    <div>Report to admins</div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center mt-1 flex-wrap">
                        <LikeButton userId={user.id} postId={comment.id} isLikeSet={isLikeSet}
                                    disabled={isOwner}
                                    unsetLike={unsetCommentLike} setLike={setCommentLike}
                                    className="btn btn-ghost btn-circle btn-sm text-lg flex"/>
                        {comment._count.userLikes}
                        <button className="btn btn-ghost btn-sm" onClick={() => setIsReplying(prev => !prev)}>
                            {isReplying ? "Cancel reply" : "Reply"}</button>
                        {isReplying && <AddCommentForm user={user} parentId={comment.id} postId={comment.postId}
                                                       addComment={addComment}
                                                       initialValue={comment.creator.name + " " || ""}/>}
                    </div>
                    <Suspense fallback={
                        <div className="flex justify-center my-3">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>}>
                        <CommentsList user={user} comments={commentByParentId[ comment.id ]}
                                      commentByParentId={commentByParentId}/>
                    </Suspense>
                </div>
            }
        </div>

    )
}