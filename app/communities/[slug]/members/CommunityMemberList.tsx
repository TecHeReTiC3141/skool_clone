import {UserOfUserList} from "@/app/users/[slug]/actions";
import UserListCard from "@/app/users/[slug]/UserListCard";

interface CommunityMemberListProps {
    users: {user: UserOfUserList}[],
}

export default function CommunityMemberList({users}: CommunityMemberListProps) {
    return (
        <div className="w-full bg-neutral rounded-lg ">
            {users.map(({user}) => (
                <UserListCard user={user} key={user.id} />
            ))}
        </div>
    )
}