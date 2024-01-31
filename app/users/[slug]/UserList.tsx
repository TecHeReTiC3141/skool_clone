import UserListCard from "@/app/users/[slug]/UserListCard";
import {UserOfUserList} from "@/app/users/[slug]/actions";

interface UserListProps {
    users: UserOfUserList[],
    title: string,
    fallbackText: string,
}

export default function UserList({users, title, fallbackText}: UserListProps) {
    return (
        <div className="w-full">
            <h4 className="font-bold mb-4">{title} {users.length}</h4>
            <div className="px-4">

            {users.length > 0 ? <div>
                {users.map(user => (
                    <UserListCard user={user} key={user.id} />
                ))}
            </div> : fallbackText}
            </div>
        </div>
    )
}