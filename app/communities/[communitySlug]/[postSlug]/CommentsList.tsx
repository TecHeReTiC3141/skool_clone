import {PostComment} from "@/app/lib/db/comment";
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
        <div className="w-full flex flex-col gap-4">
            {comments.map((comment) =>
                (<Comment user={session.user} comment={comment} getReplies={getReplies} key={comment.id} />))
            }
        </div>
    )

}