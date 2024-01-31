import {getServerSession} from "next-auth";
import UserMenuBtn from "@/app/ui/components/auth/UserMenuBtn";
import NotificationsBtn from "@/app/ui/components/NotificationsBtn";
import {authOptions} from "@/app/lib/config/authOptions";
import CommunityNavBar from "@/app/communities/[communitySlug]/CommunityNavBar";
import HeaderSwitcher from "@/app/ui/components/HeaderSwitcher";

interface HeaderProps {
    params: {
        communitySlug?: string
    }
}

export default async function Header({params: {communitySlug}}: HeaderProps) {
    const session = await getServerSession(authOptions);

    return (
        <div className="w-full bg-base-300 flex justify-center mb-4 border-b border-neutral shadow-lg shadow-base-300">
            <div className="max-w-6xl w-full">

                <header className="navbar w-full gap-3">
                    <div className="flex-1">
                        <HeaderSwitcher user={session?.user} />
                    </div>
                    <NotificationsBtn session={session}/>
                    <UserMenuBtn session={session}/>
                    <label className="flex cursor-pointer gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        <input type="checkbox" value="light" className="toggle theme-controller"/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"/>
                            <path
                                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
                        </svg>
                    </label>
                </header>
                <CommunityNavBar/>
            </div>
        </div>
    )
}