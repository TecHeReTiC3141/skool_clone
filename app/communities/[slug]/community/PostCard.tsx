import {PostWithCommentsNumber, PostWithCreator} from "@/app/lib/db/post";
import UserAvatar from "@/app/users/[slug]/UserAvatar";
import Link from "next/link";
import {SlLike} from "react-icons/sl";
import {FaRegComment} from "react-icons/fa6";
import {formatTimeAgo} from "@/app/lib/utils/formating";


interface PostCardProps {
    post: PostWithCreator & PostWithCommentsNumber,
}

export default function PostCard({post}: PostCardProps) {
    return (
        <div className="w-full rounded-lg bg-neutral p-4">
            <div className="flex gap-3 items-center">
                <UserAvatar user={post.creator} width={32} height={32} />
                <div>
                    <Link className="font-bold" href={`/users/${post.creator.slug}`}>{post.creator.name}</Link>
                    <p className="text-sm">{formatTimeAgo(post.createdAt)}</p>
                </div>
            </div>
            <h3 className="font-bold text-xl my-2">{post.title}</h3>
            <p>{post.content}</p>
            <div className="flex gap-4 mt-4">
                <div className="flex gap-2 items-center">
                    <SlLike /> {post.likes}
                </div>
                <div className="flex gap-2 items-center">
                    <FaRegComment /> {post._count.comments}
                </div>
            </div>
        </div>
    )
}