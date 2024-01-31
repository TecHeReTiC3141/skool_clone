import Link from "next/link";

interface MemberFiltersProps {
    memberCount: number,
    adminsCount: number,
}

export default function MemberFilters({memberCount, adminsCount}: MemberFiltersProps) {
    return (
        <div className="flex w-full justify-betweeen my-3">
            <div className="flex gap-3">
                <Link href="?t=member" className="btn btn-neutral rounded-full">
                    Members {memberCount}
                </Link>
                <Link href="?t=admin" className="btn btn-neutral rounded-full">
                    Admins {adminsCount}
                </Link>
                <Link href="?t=online" className="btn btn-neutral rounded-full">
                    Online {memberCount + adminsCount}
                </Link>
            </div>
        </div>
    )
}