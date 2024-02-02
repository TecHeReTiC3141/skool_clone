"use client"

import { useState } from "react";
import { SessionUser } from "@/app/lib/db/user";
import { Community } from "@prisma/client";
import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import { createPost, PostCreateData } from "@/app/lib/db/post";
import SubmitBtn from "@/app/ui/components/SubmitBtn";

interface AddNewPostProps {
    user: NonNullable<SessionUser>,
    community: Community,
}

export default function AddNewPost({user, community}: AddNewPostProps) {
    const [ isOpened, setIsOpened ] = useState(false);

    // TODO: implement adding images to the post

    async function handleSubmit(formData: FormData) {
        const data: PostCreateData = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            creatorId: user.id,
            communityId: community.id,
        }
        await createPost(data);
        setIsOpened(false);
    }

    if (isOpened) {
        return (
            <>
                {/*<div className="absolute top-0 left-0 w-full h-full ">*/}
                {/* TODO: consider adding backdrop like in original */}
                {/*</div>*/}
                <form action={handleSubmit} className="bg-neutral w-full py-2 px-4 flex flex-col gap-3 rounded-md mb-4">
                    <h2 className="flex gap-4 items-center">
                        <UserAvatar user={user} width={32} height={32}/>
                        <p><span className="font-bold">{user.name}</span> posting in <span
                            className="font-bold">{community.name}</span></p>
                    </h2>
                    <input type="text" name="title" placeholder="Title" required
                           className="bg-transparent border-none focus:outline-none text-lg font-bold"/>
                    <textarea name="content" cols={30} rows={4} required
                              className="bg-transparent border-none focus:outline-none resize-none overflow-y-hidden"
                              onInput={ev => {
                                  const submitBtn = document.querySelector("#submit-btn") as HTMLButtonElement;
                                  if (ev.currentTarget.value) {
                                      submitBtn.removeAttribute("disabled");
                                  } else {
                                      submitBtn.setAttribute("disabled", "");
                                  }
                                  ev.currentTarget.style.height = "auto";
                                  ev.currentTarget.style.height = ev.currentTarget.scrollHeight + "px";
                              }}
                              placeholder="Write something..."></textarea>
                    <div className="flex justify-end gap-3">
                        <button className="text-opacity-60 hover:text-opacity-90 uppercase btn-sm px-2" onClick={ev => {
                            ev.preventDefault();
                            setIsOpened(false);
                        }}>Cancel
                        </button>
                        <SubmitBtn className="btn-sm px-2">Post</SubmitBtn>
                    </div>
                </form>
            </>
        )
    }
    return (
        <div className="bg-neutral w-full py-2 px-4 flex items-center gap-3 rounded-md mb-4"
             onClick={() => setIsOpened(true)}>
            <UserAvatar user={user} width={50} height={50}/>
            <p className="text-lg ">Write something</p>
        </div>
    )
}