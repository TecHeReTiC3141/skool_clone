"use client"

import {SessionUser} from "@/app/lib/db/user";
import Link from "next/link";
import {CommunityMembershipData} from "@/app/lib/db/community";
import {LuChevronsUpDown} from "react-icons/lu";
import HeaderSwitcherItem from "@/app/ui/components/HeaderSwitcherItem";
import {FaCompass, FaPlus} from "react-icons/fa6";


interface HeaderSwitcherProps {
    user: SessionUser,
    communities: { community: CommunityMembershipData }[] | null;
}

export default function HeaderSwitcher({user, communities}: HeaderSwitcherProps) {
    return (
        <div className="flex items-center">
            <Link className="btn btn-ghost text-2xl text-accent" href="/">
                Skool
            </Link>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-full text-lg"><LuChevronsUpDown /></div>
                <div tabIndex={0} className="menu dropdown-content z-[1] px-0 py-3 shadow bg-base-300 rounded-box w-52 mt-4 translate-x-[35%]">
                    <HeaderSwitcherItem Icon={FaPlus} text="Create a community" url="/create-new-community" />
                    <HeaderSwitcherItem Icon={FaCompass} text="Discover communities" url="/" />
                    {communities && communities.map(({community}) => (
                        <HeaderSwitcherItem key={community.slug} Icon={community.icon} text={community.name} url={`/communities/${community.slug}/community`} />
                    ))}
                </div>
            </div>
        </div>
    )
}