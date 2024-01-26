"use client"

import UserAvatar from "@/app/users/[slug]/UserAvatar";
import Link from "next/link";
import {formatTimeAgo} from "@/app/lib/utils/formating";
import LikeButton from "@/app/communities/[slug]/community/LikeButton";
import {FaRegComment} from "react-icons/fa6";
import {SessionUser} from "@/app/lib/db/user";
import {CommunityPagePost} from "@/app/lib/db/post";
import {useState} from "react";

interface OpenedPostProps {
    user: NonNullable<SessionUser>,
    isLikeSet: boolean,
    post: CommunityPagePost,
}

export default function OpenedPost({post, user, isLikeSet}: OpenedPostProps) {

    const [ isEmpty, setIsEmpty ] = useState(true);

    async function handleSubmit(formData: FormData) {

    }
    return (
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

                <div className="flex gap-4 items-center">
                    <div className="join bg-transparent">
                        <LikeButton disabled={post.creatorId === user.id}
                                    userId={user.id} postId={post.id}
                                    className="btn join-item bg-transparent hover:bg-transparent  text-sm flex w-24"
                                    isLikeSet={isLikeSet}>{isLikeSet ?
                            <span className="font-bold text-sm">Liked</span> : <span>Like</span>}
                        </LikeButton>
                        <button className="btn join-item bg-transparent">{post._count.userLikes}</button>
                    </div>
                    <div className="flex gap-3 items-center"><FaRegComment/> {post._count.comments} comments</div>
                </div>
                <div className="divider h-1 bg-neutral"></div>
                <div>
                    {/*    Comments Section*/}
                </div>
                <form action={handleSubmit} className="w-full">
                    <div className="w-full flex gap-2 items-center">

                        <UserAvatar user={user} width={32} height={32} />
                        <input type="text" name="comment" id="comment" className="input input-bordered w-full rounded-2xl focus:outline-none"
                            onInput={ev => {
                                setIsEmpty(ev.currentTarget.value.length === 0);
                            }}
                               placeholder="Your comment"/>
                    </div>
                    {!isEmpty && <div className="flex justify-end items-center w-full mt-4 gap-3">
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <input type="checkbox" name="watch" className="checkbox checkbox-primary" />
                                <span className="label-text ml-3">Watch</span>
                            </label>
                        </div>
                        <button className="btn btn-ghost uppercase" onClick={ev => {
                            ev.preventDefault();
                            setIsEmpty(true);
                            const commentInput = document.querySelector("#comment") as HTMLInputElement;
                            commentInput.value = "";
                        }}>Cancel</button>
                        <button className="btn btn-primary uppercase">Comment</button>
                    </div>}

                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )

}