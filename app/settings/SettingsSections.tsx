"use client"

import {useSearchParams} from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function SettingsSections() {
    const sections = [
        "profile", "account",
        "password", "notifications", "chat",
        "communities", "referrals", "payment"
    ];

    const searchParams = useSearchParams();
    const currentSection = searchParams.get("section") || "profile";

    const sectionBtn = sections.map(section => (
        <Link href={`/settings?section=${section}`} key={section} className={clsx(["btn font-bold w-full flex justify-start capitalize text-lg",
            currentSection === section ? "btn-primary" : "btn-ghost"])}>{section}</Link>
    ));

    return (
        <div className="w-72 max-w-[40%]">
            {sectionBtn}
        </div>
    )
}