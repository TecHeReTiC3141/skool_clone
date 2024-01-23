import {getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";
import Image from "next/image"
import {CommunityAccessLevel} from "@prisma/client";
import {FaGlobe, FaLock} from "react-icons/fa6";
import {FiUsers} from "react-icons/fi";
import {formatMemberCount, formatPrice} from "@/app/lib/utils/formating";


interface CommunityAboutPageProps {
    params: {
        slug: string,
    },
}
export default async function CommunityAboutPage({params: {slug}}: CommunityAboutPageProps) {
    console.log("in about page", slug);
    const community = await getCommunityFromSlug(slug);

    if (!community) {
        return redirect("/404");
    }

    return (
        <div className="w-full flex flex-col gap-6 bg-neutral rounded-xl px-6 py-6">
            <h2 className="font-bold text-xl">{community.name}</h2>
            <Image src={community.thumb} alt={community.name} width={800} height={600} className="rounded-md w-full " />
            <p>{community.description}</p>
            <div className="flex items-center gap-12 text-lg ">
                <p className="flex gap-1 items-center">{community.accessLevel === CommunityAccessLevel.PUBLIC ? <FaGlobe /> : <FaLock />}
                    {community.accessLevel[0] + community.accessLevel.slice(1).toLowerCase()} group</p>
                <p className="flex gap-1 items-center"><FiUsers />{formatMemberCount(community._count.members)} members</p>
                <p className="flex gap-1 items-center"><FiUsers />{community.price ? formatPrice(community.price) : "Free"}</p>
                <p className="flex gap-1 items-center"><FiUsers />by</p>
            </div>
        </div>
    )
}