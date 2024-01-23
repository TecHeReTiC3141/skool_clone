"use client"
import {usePathname} from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function CommunityNavBar() {
    const pathname = usePathname();

    const sections = [
        "community", "classroom", "members", "calendar", "leaderboards", "about",
    ];

    if (!pathname.startsWith("/communities")) {
        return (
            <></>
        )
    }
    return (
        <nav>
            <ul className="flex gap-4 pl-2">

            {sections.map(section => (
                <li key={section} className="h-10">
                    <Link href={`./${section}`} className={clsx(["capitalize h-full block",
                        pathname.endsWith(section) ? "border-b-4 border-b-accent" : "opacity-60 hover:opacity-75"])}>{section}</Link>
                </li>
            ))}
            </ul>
        </nav>
    )
}