import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/config/authOptions";
import {redirect} from "next/navigation";
import SettingsSections from "@/app/ui/components/settings/SettingsSections";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    const user = session?.user;
    if (!user) {
        return redirect("/404");
    }

    return (
        <div className="flex w-full gap-4 mt-4">
            <SettingsSections />
        </div>
    )
}