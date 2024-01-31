import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import Link from "next/link";
import {FaRegComment} from "react-icons/fa6";
import {UserOfUserList} from "@/app/users/[userSlug]/actions";

interface MemberListCardProps {
    user: UserOfUserList,
}

export default function MemberListCard({user}: MemberListCardProps) {
    return (
        <div className="group">
            <div className="flex gap-3 p-4">
                <Link href={`/users/${user.slug}`}>
                    <UserAvatar user={user} width={40} height={40}/>
                </Link>
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <Link href={`/users/${user.slug}`}>
                            <p className="font-bold">{user.name}</p>
                            <p className="text-xs" >@{user.slug}</p>
                        </Link>
                        <button className="btn btn-disabled uppercase">Chat <FaRegComment/></button>
                    </div>
                    <p><span className="font-bold"></span> {user.description}</p>
                </div>

            </div>
            <div className="divider h-1 my-0 mx-4 group-last:hidden"></div>
        </div>
    )
}