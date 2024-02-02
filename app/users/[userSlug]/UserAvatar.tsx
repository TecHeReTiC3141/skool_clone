import { SessionUser } from "@/app/lib/db/user";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface UserAvatarProps {
    user: SessionUser,
    width: number,
    height: number,
    level?: number,
}

export default function UserAvatar({user, width, height, level}: UserAvatarProps) {
    return (
        <div className="relative" style={{width, height}}>
            {user?.image ? <Image className="rounded-full w-full h-full object-cover"
                                  src={user?.image} alt={user?.name || ""}
                                  width={160} height={160}/> : <FaUser className="text-xl"/>}
            {level && <div className="badge badge-primary absolute top-[70%] left-[70%] badge-xs py-2">1</div>}
        </div>
    )
}