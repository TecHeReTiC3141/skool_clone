import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import {FaRegCalendar, FaRegComment} from "react-icons/fa6";
import Link from "next/link";
import avatarPlaceholder from "@/public/avatar-placeholder.jpg";
import Image from "next/image";
import CommunityMembership from "@/app/users/[userSlug]/CommunityMembership";
import {CommunityAccessLevel} from "@prisma/client";
import {getUserBySlug, isFollower} from "@/app/lib/db/user";
import ToggleFollowingButton from "@/app/users/[userSlug]/ToggleFollowingButton";
import UserList from "@/app/users/[userSlug]/UserList";
import {getUserFollowers, getUserFollowing} from "@/app/users/[userSlug]/actions";


export type ProfileCommunity = {
    name: string,
    icon: string,
    accessLevel: CommunityAccessLevel,
    slug: string,
    _count: {
        members: number,
    }
}


export default async function UserProfilePage({params: {userSlug}, searchParams: {t}}: {
    params: {
        userSlug: string
    },
    searchParams: {
        t?: "following" | "followedBy",
    }
}) {
    const session = await getServerSession(authOptions);

    const currentUser = session?.user;

    const user = await getUserBySlug(userSlug);

    if (!user) {
        return (
            <h3>This user not found, maybe he does not exist or hidden</h3>
        )
    }

    let isFollowing: boolean | null = null;

    if (currentUser) {
        isFollowing = await isFollower(currentUser.id, user.id);
    }

    let joinDate = user.createdAt.toDateString();
    joinDate = joinDate.substring(joinDate.indexOf(" ") + 1);

    return (
        <div className="max-w-6xl flex justify-between w-full gap-6 mt-12 m-auto">
            {t && (t === "followedBy" || t === "following") ? <UserList users={await (t === "following" ? getUserFollowing : getUserFollowers)(user.id)}
                                                                 title={t === "following" ?
                                                                     "Following" : "Followers"}
                                                                 fallbackText={t === "following" ?
                                                                     `${user.name} do not follow any users` :
                                                                     `${user.name} doesn't have any followers`} /> :
                <div className="flex flex-col gap-6">
                    <div>
                        <h4 className="text-lg mb-8">Activity</h4>
                        <div className="skeleton w-[48rem] h-48"></div>
                    </div>

                    <div>
                        <h4 className="text-lg mb-4">Memberships</h4>
                        {user.communities.length > 0 ?
                            <div className="flex flex-col gap-4">
                                {user.communities.map(({community}) =>
                                    (<CommunityMembership key={community.slug} community={community}/>))}
                            </div>
                            : <p>You are not member of any communities, join some or create your own</p>}
                    </div>

                    <div>
                        <h4 className="text-lg">Contributions</h4>
                    </div>
                </div>}
            <div className="card card-compact w-72 bg-neutral shadow-xl">
                <div className="card-body">
                    <div className="avatar">
                        <div className="w-full rounded-full border-4 border-primary">
                            <Image src={user.image || avatarPlaceholder.src} alt="Shoes"
                                   width={280} height={280}/>
                        </div>
                    </div>
                    <h2 className="card-title">{user.name}</h2>
                    <p className="text-sm">@{user.slug}</p>
                    <p className="text-sm">{user.description}</p>
                    <div className="divider h-2 my-0"></div>

                    <p className="flex items-center gap-4 my-3"><FaRegCalendar className="text-lg"/> Joined {joinDate}
                    </p>

                    <div className="divider h-1 my-0"></div>
                    <div className="flex justify-between w-full">
                        <button className="bg-transparent flex flex-col items-center">
                            <p className="text-lg">0</p>
                            <span className="text-sm">contributions</span>
                        </button>

                        <div className="divider divider-horizontal w-1 mx-1"></div>

                        <Link href="?t=followedBy" className="bg-transparent flex flex-col items-center">
                            <p className="text-lg">{user._count.followedBy}</p>
                            <span className="text-sm">followers</span>
                        </Link>
                        <div className="divider divider-horizontal w-1 mx-1"></div>
                        <Link href="?t=following" className="bg-transparent flex flex-col items-center">
                            <p className="text-lg">{user._count.following}</p>
                            <span className="text-sm">following</span>
                        </Link>
                    </div>
                    <div className="divider h-1 my-0"></div>

                    {currentUser?.id === user.id ?
                        <Link href="/settings" className="btn btn-primary btn-wide">Edit profile</Link> :
                        <div className="w-full">
                            <ToggleFollowingButton isFollowing={isFollowing} profileUserId={user.id}
                                                   currentUserId={currentUser?.id}/>
                            <button className="btn btn-primary btn-block uppercase">Chat <FaRegComment/></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}