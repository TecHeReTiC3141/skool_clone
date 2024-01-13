"use client"

import {FaUser} from "react-icons/fa6";
import {Session} from "next-auth";
import Link from "next/link";
import LogOutModal from "@/app/ui/components/auth/LogOutModal";

interface UserMenuBtnProps {
    session: Session | null,
}

export default function UserMenuBtn({session}: UserMenuBtnProps) {

    const user = session?.user;

    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <FaUser className="text-xl"/>
                </div>
                <ul tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52 top-[85%]">
                    {user ?
                        <>
                            <li className="px-2 py-2">
                                {user.email}
                            </li>
                            <div className="divider h-2 my-0"></div>
                            <li>
                                <Link href="/profile" className="justify-between py-3">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link href="/settings" className="py-3">
                                Settings</Link>
                            </li>
                            <li>
                                <button className="py-3 opacity-40" onClick={() => {
                                    const modal = document.getElementById('logout-modal') as HTMLDialogElement;
                                    modal.showModal();
                                }}>
                                    Logout
                                </button>
                            </li>
                        </> :
                        <li>
                            <Link href="/login">Log in</Link>
                        </li>
                    }
                </ul>

            </div>
            <LogOutModal />
        </>
    )
}