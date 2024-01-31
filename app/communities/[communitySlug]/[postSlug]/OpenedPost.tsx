import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import Link from "next/link";
import {formatTimeAgo} from "@/app/lib/utils/formating";
import LikeButton from "@/app/communities/[communitySlug]/community/LikeButton";
import {FaRegComment} from "react-icons/fa6";
import {Suspense} from "react";
import OpenedPostComments from "@/app/communities/[communitySlug]/community/OpenedPostComments";
import SubmitBtn from "@/app/ui/components/SubmitBtn";

export default function OpenedPost() {


    return (

        <div
            className="bg-neutral rounded-lg p-8 max-w-2xl w-full absolute top-16 max-h-[90%] overflow-y-scroll overflow-x-hidden">
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

            <Suspense fallback={
                <div className="flex justify-center my-3">
                    <span className="loading loading-spinner loading-md"></span>
                </div>}>
                <OpenedPostComments comments={postComments}/>
            </Suspense>

            <form action={handleSubmit} className="w-full mt-4">
                <div className="w-full flex gap-2 items-center">

                    <UserAvatar user={user} width={32} height={32}/>
                    <input type="text" name="comment" id="comment"
                           className="input input-bordered w-full rounded-2xl focus:outline-none"
                           onInput={ev => {
                               const actions = document.querySelector("#actions")!;
                               if (ev.currentTarget.value.length === 0) {
                                   actions.classList.remove("flex");
                                   actions.classList.add("hidden");
                               } else {
                                   actions.classList.remove("hidden");
                                   actions.classList.add("flex");
                               }
                           }}
                           placeholder="Your comment"/>
                </div>
                <div className="hidden justify-end items-center w-full mt-4 gap-3" id="actions">
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <input type="checkbox" name="watch" className="checkbox checkbox-primary"/>
                            <span className="label-text ml-3">Watch</span>
                        </label>
                    </div>
                    <button className="btn btn-ghost uppercase" onClick={ev => {
                        ev.preventDefault();
                        clearCommentForm();
                    }}>Cancel
                    </button>
                    <SubmitBtn>Comment</SubmitBtn>
                </div>

            </form>
        </div>
    )
}