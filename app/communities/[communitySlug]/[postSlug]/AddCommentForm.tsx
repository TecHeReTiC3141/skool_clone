"use client"

import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import SubmitBtn from "@/app/ui/components/SubmitBtn";
import {CommentCreateData} from "@/app/lib/db/comment";
import {SessionUser} from "@/app/lib/db/user";
import {useState} from "react";
import clsx from "clsx";

interface AddCommentFormProps {
    user: NonNullable<SessionUser>,
    postId: string,
    parentId?: string | null,
    addComment: (data: CommentCreateData) => Promise<void>,
    initialValue?: string,
}

export default function AddCommentForm({user, postId, addComment, parentId = null, initialValue=""}: AddCommentFormProps) {

    const [ comment, setComment ] = useState("");

    const [ isOpened, setIsOpened ] = useState(parentId === null);

    async function handleAddComment(formData: FormData) {
        const data: CommentCreateData = {
            answeredPostId: postId,
            content: formData.get("comment") as string,
            creatorId: user.id,
            parentId,
        }
        await addComment(data);
        setComment("");
        setIsOpened(false);
    }

    return (
        <>
            {parentId !== null && <button className="btn btn-ghost btn-sm" onClick={() => setIsOpened(true)}>Reply</button>}
            <form action={handleAddComment} className={clsx([ "w-full mt-4", !isOpened && "hidden" ])}>
                <div className="w-full flex gap-2 items-center">
                    <UserAvatar user={user} width={32} height={32}/>
                    <input type="text" name="comment" id="comment"
                           className="input input-bordered w-full rounded-2xl focus:outline-none"
                           value={comment}
                           onInput={ev => {
                               setComment(ev.currentTarget.value);
                           }}
                           placeholder="Your comment"/>
                </div>
                <div
                    className={clsx([ "justify-end items-center w-full mt-4 gap-3", comment === "" ? "hidden" : "flex" ])}
                    id="actions">
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <input type="checkbox" name="watch" className="checkbox checkbox-primary"/>
                            <span className="label-text ml-3">Watch</span>
                        </label>
                    </div>
                    <button className="btn btn-ghost uppercase" onClick={ev => {
                        ev.preventDefault();
                        setComment("");
                        if (parentId) {
                            setIsOpened(false);
                        }
                    }}>Cancel
                    </button>
                    <SubmitBtn>Comment</SubmitBtn>
                </div>

            </form>
        </>
    )
}