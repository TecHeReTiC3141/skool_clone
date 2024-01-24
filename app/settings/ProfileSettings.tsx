"use client"

import {User} from "@prisma/client";
import {Metadata} from "next";
import {UserSettings} from "@/app/lib/db/user";
import SubmitBtn from "@/app/ui/components/SubmitBtn";
import FileUpload from "@/app/ui/components/FileUpload";
import avatarPlaceholder from "@/public/avatar-placeholder.jpg";
import Image from "next/image";

interface ProfileSettingsProps {
    user: User,
    updateUserSettings: (id: string, data: UserSettings) => Promise<void>,
}

export const metadata: Metadata = {
    title: "User settings",
    description: "Settings",
}

export default function ProfileSettings({user, updateUserSettings}: ProfileSettingsProps) {


    async function handleSubmit(formData: FormData) {

        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
        };
        console.log(data);
        await updateUserSettings(user.id, data);
        const updateButton = document.querySelector("#submit-btn")!;
        updateButton.setAttribute("disabled", "");
    }

    return (
        <div className="bg-neutral rounded-md flex-1 p-8">
            <h3 className="text-xl font-bold mb-8">Profile</h3>

            <div className="flex gap-4 items-center mb-4">
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        {/* Turn into image */}
                        <Image src={user?.image || avatarPlaceholder.src} alt="Shoes"
                             width={160} height={160}/>
                    </div>
                </div>
                <p>Change photo</p>
            </div>
            <FileUpload user={user} />
            <form action={handleSubmit} className="flex flex-col gap-4" onChange={event => {
                const updateButton = document.querySelector("#submit-btn")!;
                const form = event.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                for (const key  in user) {
                    const keyTyped = key as keyof typeof user;
                    if (data.get(key) !== user[ keyTyped ]) {
                        updateButton.removeAttribute("disabled");
                        return;
                    }
                }
                updateButton.setAttribute("disabled", "");
            }}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Your name:</span>
                    </div>
                    <input type="text" name="name" className="input input-bordered" defaultValue={user.name || ""}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Your bio:</span>
                    </div>
                    <textarea name="description" className="textarea textarea-bordered"
                              placeholder="Bio" defaultValue={user.description || ""}>

                    </textarea>
                </label>

                <SubmitBtn >Update user</SubmitBtn>
            </form>
        </div>
    )
}