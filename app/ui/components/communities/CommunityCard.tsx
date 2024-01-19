import Link from "next/link";
import {Community} from "@prisma/client";
import Image from "next/image";

interface CommunityCardProps {
    community: Community,
}

export default function CommunityCard({community}: CommunityCardProps) {
    return (
        <Link href={`/communities/${community.slug}`} className="justify-self-center">
            <div
                className="card card-compact w-[21rem] h-[24rem] bg-neutral hover:shadow-inner shadow-base-300 rounded-xl overflow-hidden">
                <figure>
                    <Image src={community.thumb} alt={community.name + " thumb"} width={380} height={360}
                           className="w-full h-48"/>
                </figure>
                <div className="card-body pb-2 relative">
                    <h2 className="card-title text-sm"><Image src={community.icon} alt={community.name}
                                                              width={160} height={160}
                                                              className="rounded-lg w-12 h-12"/>{community.name}</h2>

                    <p className="text-left max-h-12 test-sm text-wrap overflow-hidden">{community.description}</p>
                    <p className="text-left absolute bottom-1 pb-2">
                        {community.accessLevel[ 0 ].toUpperCase() + community.accessLevel.slice(1).toLowerCase()} • {community.memberCount} members
                        • {community.price > 0 ? "Paid" : "Free"}</p>
                </div>
            </div>
        </Link>
    )
}