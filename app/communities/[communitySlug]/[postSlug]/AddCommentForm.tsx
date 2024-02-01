"use client"

import UserAvatar from "@/app/users/[userSlug]/UserAvatar";
import SubmitBtn from "@/app/ui/components/SubmitBtn";
import {CommentCreateData} from "@/app/lib/db/comment";
import {SessionUser} from "@/app/lib/db/user";

interface AddCommentFormProps {
    user: NonNullable<SessionUser>,
    postId: string,
    parentId?: string | null,
    addComment: (data: CommentCreateData) => Promise<void>
}

export default function AddCommentForm({user, postId, addComment, parentId = null}:AddCommentFormProps) {

    async function handleAddComment(formData: FormData) {
        const data: CommentCreateData = {
            answeredPostId: postId,
            content: formData.get("comment") as string,
            creatorId: user.id,
            parentId,
        }
        await addComment(data);
        clearCommentForm();
    }

    function clearCommentForm() {
        const actions = document.querySelector("#actions")!;
        actions.classList.remove("flex");
        actions.classList.add("hidden");
        const commentInput = document.querySelector("#comment") as HTMLInputElement;
        commentInput.value = "";
    }

    return (
        <form action={handleAddComment} className="w-full mt-4">
            <div className="w-full flex gap-2 items-center">

                <UserAvatar user={user} width={32} height={32}/>
                <input type="text" name="comment" id="comment"
                       className="input input-bordered w-full rounded-2xl focus:outline-none"
                       onInput={ev => {
                           const actions = document.querySelector("#actions")!;
                           if (ev.currentTarget.value.length === 0) {
                               actions.classList.remove("flex");
                               actions.classList.add("hidden");
                           } else {
                               actions.classList.remove("hidden");
                               actions.classList.add("flex");
                           }
                       }}
                       placeholder="Your comment"/>
            </div>
            <div className="hidden justify-end items-center w-full mt-4 gap-3" id="actions">
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <input type="checkbox" name="watch" className="checkbox checkbox-primary"/>
                        <span className="label-text ml-3">Watch</span>
                    </label>
                </div>
                <button className="btn btn-ghost uppercase" onClick={ev => {
                    ev.preventDefault();
                    clearCommentForm();
                }}>Cancel
                </button>
                <SubmitBtn>Comment</SubmitBtn>
            </div>

        </form>
    )
}