import {PostComments} from "@/app/lib/db/post";
import Comment from "@/app/communities/[communitySlug]/community/Comment";

interface OpenedPostCommentsProps {
    comments: PostComments,
}

interface CommentsTreeData {
    postId: string,
    level: number,
}


export default async function OpenedPostComments({comments}: OpenedPostCommentsProps) {
    console.log("in render comments");
    if (!comments) {
        return (<div></div>);
    }
    function renderCommentsTree(subTree: PostComments, level: number = 0) {
        const {id, comments} = subTree;
        if (level > 0) {
            commentsTree.push({postId: id, level});
        }
        if (comments.length > 0) ++level;
        for (let comment of comments) {
            renderCommentsTree(comment, level);
        }
    }

    const commentsTree: CommentsTreeData[] = [];
    renderCommentsTree(comments);

    return (
        <div className="w-full flex flex-col gap-4">
            {commentsTree.map(({postId, level}) =>
                (<Comment commentId={postId} level={level} key={postId} />))
            }
        </div>
    )

}