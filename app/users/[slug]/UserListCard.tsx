import {UserOfUserList} from "@/app/lib/db/user";
import UserAvatar from "@/app/users/[slug]/UserAvatar";
import Link from "next/link";
import {FaRegComment} from "react-icons/fa6";

interface UserListCardProps {
    user: UserOfUserList,
}

export default function UserListCard({user}: UserListCardProps) {
    return (
        <div className="flex gap-3 bg-neutral first:rounded-t-lg p-4">
            <Link href={`/users/${user.slug}`}>
                <UserAvatar user={user} width={40} height={40}/>
            </Link>
            <div className="w-full">
                <div className="flex justify-between w-full">
                    <Link href={`/users/${user.slug}`} className="font-bold">{user.name}</Link>
                    <button className="btn btn-disabled uppercase">Chat <FaRegComment/></button>
                </div>
                <p><span className="font-bold">Bio:</span> {user.description}</p>
            </div>
        </div>
    )
}