import {ProfileCommunity} from "@/app/users/[slug]/page";
import Image from "next/image";
import Link from "next/link";
import {formatMemberCount} from "@/app/lib/utils/formating";

interface CommunityMembershipProps {
    community: ProfileCommunity,
}

export default function CommunityMembership({community}: CommunityMembershipProps) {
    return (
        <Link href={`/communities/${community.slug}/community`} className="flex gap-4">
            <div className="w-full bg-neutral rounded-md py-4 px-5">
                <Image src={community.icon} alt={community.name} width={160} height={160}
                       className="rounded-md w-8 h-8 object-cover"/>
                <div className="text-xs">
                    <p className="font-bold mb-1">{community.name}</p>
                    <p>{formatMemberCount(community._count.members)} members</p>
                </div>
            </div>
        </Link>
    )
}