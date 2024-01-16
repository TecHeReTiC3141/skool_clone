import {getServerSession} from "next-auth";
import prisma from "@/app/lib/db/prisma";
import {authOptions} from "@/app/lib/config/authOptions";
import {FaRegCalendar} from "react-icons/fa6";
import Link from "next/link";
import avatarPlaceholder from "@/public/avatar-placeholder.jpg";


export default async function UserProfilePage({params: {slug}}: {
    params: {
        slug: string
    }
}) {
    const session = await getServerSession(authOptions);

    const currentUser = session?.user;

    const user = await prisma.user.findUnique({
        where: {
            slug,
        }
    });
    // console.log("in profile", user, currentUser);

    if (!user) {
        return (
            <h3>This user not found, maybe he does not exist or hidden</h3>
        )
    }

    let joinDate = user.createdAt.toDateString();
    joinDate = joinDate.substring(joinDate.indexOf(" ") + 1);
    return (
        <div className="flex justify-between w-full gap-6 mt-12">
            <div className="flex flex-col gap-6">
                <div>
                    <h4 className="text-lg mb-8">Activity</h4>
                    <div className="skeleton w-[48rem] h-48"></div>
                </div>

                <div>
                    <h4 className="text-lg">Memberships</h4>
                    <p>There will be your memberships</p>
                </div>

                <div>
                    <h4 className="text-lg">Contributions</h4>
                </div>
            </div>
            <div className="card card-compact  w-72 bg-neutral shadow-xl">
                <div className="card-body">
                    <div className="avatar">
                        <div className="w-full rounded-full">
                            {/* Turn into image */}
                            <img src={user?.image || avatarPlaceholder.src} alt="Shoes"
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

                        <button className="bg-transparent flex flex-col items-center">
                            <p className="text-lg">{user.followersNumber}</p>
                            <span className="text-sm">followers</span>
                        </button>
                        <div className="divider divider-horizontal w-1 mx-1"></div>
                        <button className="bg-transparent flex flex-col items-center">
                            <p className="text-lg">{user.followingNumber}</p>
                            <span className="text-sm">following</span>
                        </button>
                    </div>
                    <div className="divider h-1 my-0"></div>

                    {currentUser?.id === user.id &&
                        <Link href="/settings" className="btn btn-primary btn-wide">Edit profile</Link>
                    }
                </div>
            </div>
        </div>
    )
}