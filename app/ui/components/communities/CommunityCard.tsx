import Link from "next/link";
import Image from "next/image";
import { CommunityWithMemberCount } from "@/app/lib/db/community";

interface CommunityCardProps {
    community: CommunityWithMemberCount,
    index: number
}

export default function CommunityCard({community, index}: CommunityCardProps) {

    const MAX_DESCRIPTION_LENGTH = 100;

    return (
        <Link href={`/communities/${community.slug}/community`} className="justify-self-center">
            <div
                className="card card-compact w-[21rem] h-[23rem] bg-neutral hover:shadow-inner shadow-base-300 rounded-xl overflow-hidden">
                <figure>
                    <Image src={community.thumb} alt={community.name + " thumb"} width={380} height={360}
                           className="w-full h-48" />
                </figure>
                <div className="card-body relative">
                    <h2 className="card-title text-sm"><Image src={community.icon} alt={community.name}
                                                              width={160} height={160}
                                                              className="rounded-lg w-10 h-10 object-cover"/>{community.name}</h2>

                    <p className="text-left max-h-16 test-sm text-wrap overflow-hidden">{community.description.slice(0, MAX_DESCRIPTION_LENGTH)
                        + (community.description.length > MAX_DESCRIPTION_LENGTH ? "..." : "")}</p>
                    <p className="text-left absolute bottom-1 pb-2">
                        {community.accessLevel[ 0 ].toUpperCase() + community.accessLevel.slice(1).toLowerCase()} • {community._count.members} members
                        • {community.price > 0 ? "Paid" : "Free"}</p>
                </div>
                <div className="badge absolute left-2 top-2 bg-opacity-75 text-gray-100 h-8 w-10 p-1 rounded-full">#{index +  1}</div>
            </div>
        </Link>
    )
}