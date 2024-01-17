"use client"

import {IoMdNotificationsOutline} from "react-icons/io";
import {Session} from "next-auth";

interface NotificationsBtnProps {
    session: Session | null,
}

export default function NotificationsBtn({session}: NotificationsBtnProps) {
    return (
        <>
            {
                session?.user &&
                <div className="dropdown dropdown-end">
                    <div className="tooltip tooltip-bottom" data-tip="Notifications">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <IoMdNotificationsOutline className="text-2xl"/>
                        </div>
                    </div>
                    <div tabIndex={0}
                         className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52 top-[80%]">
                        <h4>No notifications yet</h4>
                    </div>
                </div>
            }
        </>
    )
}