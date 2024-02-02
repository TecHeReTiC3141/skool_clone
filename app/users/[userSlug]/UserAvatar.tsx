import {SessionUser} from "@/app/lib/db/user";
import Image from "next/image";
import {FaUser} from "react-icons/fa6";

interface UserAvatarProps {
    user: SessionUser,
    width: number,
    height: number,
}

export default function UserAvatar({user, width, height}: UserAvatarProps) {
    return (
        <>
            {user?.image ? <Image className="rounded-full object-cover"
                                  style={{width, height}}
                                  src={user?.image} alt={user?.name || ""}
                                  width={160} height={160}/> : <FaUser className="text-xl"/>}
        </>
    )
}