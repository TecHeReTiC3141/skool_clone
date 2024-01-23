import Image from "next/image";
import {FaGlobe, FaLock} from "react-icons/fa6";
import {CommunityAccessLevel} from "@prisma/client";
import {CommunityWithMemberCount, CommunityWithMembers} from "@/app/lib/db/community";

interface CommunityInfoCardProps {
    community: CommunityWithMemberCount & CommunityWithMembers,
}

export default function CommunityInfoCard({community}: CommunityInfoCardProps) {
    return (
        <div className="card card-compact w-72 bg-neutral shadow-xl">
            <figure><Image src={community.thumb} alt={community.name}
                           width={280} height={280} className="w-full"/></figure>
            <div className="card-body">
                <h2 className="card-title">{community.name}</h2>
                <p className="text-sm flex gap-1 items-center">{community.accessLevel === CommunityAccessLevel.PUBLIC ? <FaGlobe /> : <FaLock />}
                    {community.accessLevel[0] + community.accessLevel.slice(1).toLowerCase()} group</p>
                <p className="text-sm">@{community.slug}</p>
                <p className="text-sm">{community.description}</p>
                <div className="divider h-2 my-0"></div>

                {/*<div className="divider h-1 my-0"></div>*/}
                {/*<div className="flex justify-between w-full">*/}
                {/*    <button className="bg-transparent flex flex-col items-center">*/}
                {/*        <p className="text-lg">0</p>*/}
                {/*        <span className="text-sm">contributions</span>*/}
                {/*    </button>*/}

                {/*    <div className="divider divider-horizontal w-1 mx-1"></div>*/}

                {/*    <button className="bg-transparent flex flex-col items-center">*/}
                {/*        <p className="text-lg">{user.followersNumber}</p>*/}
                {/*        <span className="text-sm">followers</span>*/}
                {/*    </button>*/}
                {/*    <div className="divider divider-horizontal w-1 mx-1"></div>*/}
                {/*    <button className="bg-transparent flex flex-col items-center">*/}
                {/*        <p className="text-lg">{user.followingNumber}</p>*/}
                {/*        <span className="text-sm">following</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
                {/*<div className="divider h-1 my-0"></div>*/}
            </div>
        </div>
    )
}