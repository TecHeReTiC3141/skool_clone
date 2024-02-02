import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import Link from "next/link";
import {formatTimeAgo} from "@/app/lib/utils/formating";
import LikeButton from "@/app/communities/[communitySlug]/community/LikeButton";
import {FaArrowLeftLong, FaRegComment} from "react-icons/fa6";
import {Suspense} from "react";
import CommentsList from "@/app/communities/[communitySlug]/[postSlug]/CommentsList";
import {SessionUser} from "@/app/lib/db/user";
import {CommunityPagePost, isPostLiked, setPostLike, unsetPostLike} from "@/app/lib/db/post";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import {redirect} from "next/navigation";
import {addComment, getPostComments, isCommentLiked, PostComment, PostComments} from "@/app/lib/db/comment";
import AddCommentForm from "@/app/communities/[communitySlug]/[postSlug]/AddCommentForm";


interface OpenedPostProps {
    post: CommunityPagePost,
}

export interface CommentsByParentId {
    [p: string]: PostComment[],
}

export default async function OpenedPost({post}: OpenedPostProps) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect("/login");
    }

    const user: NonNullable<SessionUser> = session.user;

    const isLikeSet = await isPostLiked(user.id, post.id);

    const postComments: PostComments = await getPostComments(post.id);

    async function getCommentsByParentId(comments: PostComment[]): Promise<CommentsByParentId> {
        const group: {
            [ key: string ]: PostComment[],
        } = {"topLevel": []};

        for (const comment of comments) {
            comment.isLikeSet = await isCommentLiked(user.id, comment.id);
            group[ comment.parentId || "topLevel" ] ||= [];
            group[ comment.parentId || "topLevel" ].push(comment);
        }
        return group;
    }

    const commentByParentId = await getCommentsByParentId(postComments.comments);

    console.log("is like set", isLikeSet);

    return (

        <div
            className="bg-neutral rounded-lg p-8 pt-12 w-full relative">
            <Link href="community" className="text-sm absolute left-3 top-2 hover:underline flex gap-2 items-center">
                <FaArrowLeftLong /> Back to all posts</Link>
            <div className="flex justify-between items-center mb-4">

                <div className="flex gap-3 items-center z-50 sticky top-0">
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
                                setLike={setPostLike}
                                unsetLike={unsetPostLike}
                                isLikeSet={isLikeSet}>{isLikeSet ?
                        <span className="font-bold text-sm">Liked</span> : <span>Like</span>}
                    </LikeButton>
                    <button className="btn join-item bg-transparent">{post._count.userLikes}</button>
                </div>
                <div className="flex gap-3 items-center"><FaRegComment/> {post._count.comments} comments</div>
            </div>
            <div className="divider h-1 bg-neutral"></div>

            {postComments && <Suspense fallback={
                <div className="flex justify-center my-3">
                    <span className="loading loading-spinner loading-md"></span>
                </div>}>
                <CommentsList user={user} comments={commentByParentId["topLevel"]} commentByParentId={commentByParentId}/>
            </Suspense>}

            <AddCommentForm user={user} postId={post.id} addComment={addComment} />

        </div>
    )
}