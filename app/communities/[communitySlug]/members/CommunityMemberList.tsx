import {UserOfUserList} from "@/app/users/[userSlug]/actions";
import MemberListCard from "@/app/communities/[communitySlug]/members/MemberListCard";

interface CommunityMemberListProps {
    users: {user: UserOfUserList}[],
}

export default function CommunityMemberList({users}: CommunityMemberListProps) {
    return (
        <div className="w-full bg-neutral rounded-lg ">
            {users.map(({user}) => (
                <MemberListCard user={user} key={user.id} />
            ))}
        </div>
    )
}