import {PostComment} from "@/app/lib/db/comment";
import Comment from "@/app/communities/[communitySlug]/[postSlug]/Comment";

interface OpenedPostCommentsProps {
    comments: PostComment[],
    getReplies: (id: string) => PostComment[],
}

export default async function CommentsList({comments, getReplies}: OpenedPostCommentsProps) {
    console.log("in render comments");
    if (!comments) {
        return (<div></div>);
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {comments.map((comment) =>
                (<Comment comment={comment} getReplies={getReplies} key={comment.id} />))
            }
        </div>
    )

}