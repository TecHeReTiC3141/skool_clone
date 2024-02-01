import {isLiked, PostComment} from "@/app/lib/db/comment";
import Comment from "@/app/communities/[communitySlug]/[postSlug]/Comment";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import {redirect} from "next/navigation";

interface OpenedPostCommentsProps {
    comments: PostComment[],
    getReplies: (id: string) => PostComment[],
}

export default async function CommentsList({comments, getReplies}: OpenedPostCommentsProps) {
    if (!comments) {
        return (<div></div>);
    }

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/404");
    }


    return (
        <div className="w-full flex flex-col gap-4 mt-2">
            {comments.map(async (comment) =>
                (<Comment user={session.user} isLikeSet={await isLiked(session.user.id, comment.id)} comment={comment} getReplies={getReplies} key={comment.id} />))
            }
        </div>
    )

}