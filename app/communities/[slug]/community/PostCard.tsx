"use client"

import {CommunityPagePost} from "@/app/lib/db/post";
import UserAvatar from "@/app/users/[slug]/UserAvatar";
import Link from "next/link";
import {FaRegComment} from "react-icons/fa6";
import {formatTimeAgo} from "@/app/lib/utils/formating";
import {SessionUser} from "@/app/lib/db/user";
import LikeButton from "@/app/communities/[slug]/community/LikeButton";

interface PostCardProps {
    user: NonNullable<SessionUser>,
    isLikeSet: boolean,
    post: CommunityPagePost,
}

export default function PostCard({user, post, isLikeSet}: PostCardProps) {

    return (
        <>
            <div onClick={() => {
                const modal = document.getElementById(`opened_post_${post.slug}`) as HTMLDialogElement;
                modal.showModal();
            }}
                 className="w-full rounded-lg bg-neutral p-4 cursor-pointer">
                <div className="flex gap-3 items-center">
                    <UserAvatar user={post.creator} width={32} height={32}/>
                    <div>
                        <Link className="font-bold" href={`/users/${post.creator.slug}`}>{post.creator.name}</Link>
                        <p className="text-sm">{formatTimeAgo(post.createdAt)}</p>
                    </div>
                </div>
                <h3 className="font-bold text-xl my-2">{post.title}</h3>
                <p>{post.content}</p>
                <div className="flex gap-4 mt-4">
                    <div className="flex gap-2 items-center">
                        <LikeButton disabled={post.creatorId === user.id} userId={user.id} postId={post.id}
                                    isLikeSet={isLikeSet}/>
                        {post._count.userLikes}
                    </div>
                    <div className="flex gap-2 items-center">
                        <FaRegComment/> {post._count.comments}
                    </div>
                </div>
            </div>
            <dialog id={`opened_post_${post.slug}`} className="modal">
                <div className="bg-neutral rounded-lg p-8 max-w-2xl w-full absolute top-16">
                    <div className="flex justify-between items-center mb-4">

                        <div className="flex gap-3 items-center">
                            <UserAvatar user={post.creator} width={40} height={40}/>
                            <div>
                                <Link className="font-bold"
                                      href={`/users/${post.creator.slug}`}>{post.creator.name}</Link>
                                <p className="text-xs">{formatTimeAgo(post.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="tooltip tooltip-accent tooltip-bottom"
                                 data-tip="Get notification when there is a new post activity">
                                <button className="btn btn-outline btn-sm px-2">Watch</button>
                            </div>
                            <button className="btn btn-outline btn-sm px-2">...</button>
                        </div>
                    </div>
                    <h3 className="font-bold text-xl">{post.title}</h3>
                    <p className="py-4">{post.content}</p>

                    <div className="flex gap-4">
                        <div className="join">
                            <button className="btn join-item">
                                <LikeButton disabled={post.creatorId === user.id}
                                            userId={user.id} postId={post.id}
                                            isLikeSet={isLikeSet}>{isLikeSet ?
                                    <span className="font-bold text-sm">Liked</span> : <span>Like</span>}
                                </LikeButton>
                            </button>
                            <button className="btn join-item">Button</button>
                            <button className="btn join-item">Button</button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}