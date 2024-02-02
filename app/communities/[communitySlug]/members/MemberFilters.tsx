import Link from "next/link";
import clsx from "clsx";

interface MemberFiltersProps {
    memberCount: number,
    adminsCount: number,
    section?: string,
}

export default function MemberFilters({memberCount, adminsCount, section}: MemberFiltersProps) {
    return (
        <div className="flex w-full justify-betweeen mb-5">
            <div className="flex gap-3">
                <Link href="?t=member" className={clsx(["btn rounded-full", !section || section === "member" ? "btn-primary" : "btn-neutral"])}>
                    Members {memberCount}
                </Link>
                <Link href="?t=admin" className={clsx(["btn rounded-full", section === "admin" ? "btn-primary" : "btn-neutral"])}>
                    Admins {adminsCount}
                </Link>
                <Link href="?t=online" className={clsx(["btn rounded-full", section === "online" ? "btn-primary" : "btn-neutral"])}>
                    Online {memberCount + adminsCount}
                </Link>
            </div>
        </div>
    )
}