import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import {redirect} from "next/navigation";
import SettingsSections from "@/app/settings/SettingsSections";
import ProfileSettings from "@/app/settings/ProfileSettings";
import prisma from "@/app/lib/db/prisma";
import {User} from "@prisma/client";
import {updateUserSettings} from "@/app/settings/actions";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    const currentUser = session?.user;

    if (!currentUser) {
        return redirect("/404");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: currentUser?.id,
        }
    }) as User;

    return (
        <div className="flex w-full gap-8 mt-8">
            <SettingsSections />
            <ProfileSettings user={user} updateUserSettings={updateUserSettings}/>
        </div>
    )
}