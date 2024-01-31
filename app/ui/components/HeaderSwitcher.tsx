"use client"

import {SessionUser} from "@/app/lib/db/user";
import Link from "next/link";


interface HeaderSwitcherProps {
    user: SessionUser,
}

export default function HeaderSwitcher({user}: HeaderSwitcherProps) {
    return (
        <Link className="btn btn-ghost text-2xl text-accent" href="/">
            Skool
        </Link>
    )
}