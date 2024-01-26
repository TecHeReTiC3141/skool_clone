import {SessionUser} from "@/app/lib/db/user";
import {CommentsWithComments, CommunityPagePost, getPostComments} from "@/app/lib/db/post";
import type {JSX} from "react";
import Comment from "@/app/communities/[slug]/community/Comment";

interface OpenedPostCommentsProps {
    user: NonNullable<SessionUser>,
    post: CommunityPagePost,
}

export default async function OpenedPostComments({user, post}: OpenedPostCommentsProps) {

    const allComments = await getPostComments(post.id);
    if (!allComments) {
        return (<div></div>);
    }
    const {comments} = allComments;
    console.log(comments);

    const commentsElements: JSX.Element[] = [];


    function renderCommentsTree(commentsList: CommentsWithComments, level: number = 1) {
        if (!commentsList || commentsList.length === 0) return;
        for (let comment of commentsList) {
            const {comments: subComments, ...post } = comment;
            commentsElements.push(<Comment user={user} comment={post} level={level} key={post.id} />);
            renderCommentsTree(subComments, ++level);
        }
    }

    renderCommentsTree(comments);

    return (
        <div className="w-full flex flex-col gap-4">
            {commentsElements}
        </div>
    )

}