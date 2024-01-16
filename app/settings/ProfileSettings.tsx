"use client"

import {User} from "@prisma/client";
import {Metadata} from "next";
import {UserSettings} from "@/app/lib/db/user";
import SubmitBtn from "@/app/ui/components/SubmitBtn";

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
        const updateButton = document.querySelector("#update-profile")!;
        updateButton.setAttribute("disabled", "");
    }

    return (
        <div className="bg-neutral rounded-md flex-1 p-8">
            <h3 className="text-xl font-bold mb-8">Profile</h3>
            <form action={handleSubmit} className="flex flex-col gap-4" onChange={event => {
                const updateButton = document.querySelector("#update-profile")!;
                const form = event.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                for (const key of data.keys()) {
                    if (key in user && data.get(key) !== user[ key ]) {
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
                    <textarea name="description" className="textarea textarea-bordered" placeholder="Bio" defaultValue={user.description || ""}>

                    </textarea>
                </label>

                <SubmitBtn >Update user</SubmitBtn>
            </form>
        </div>
    )
}