import clsx from "clsx";
import SubmitBtn from "@/app/ui/components/SubmitBtn";
import { useState } from "react";
import { SessionUser } from "@/app/lib/db/user";

interface AddCommentFormProps {
    user: NonNullable<SessionUser>,
    commentId: string,
    updateComment: (id: string, newComment: string) => Promise<void>,
    initialValue?: string,
    closeEditing: () => void,
}


export default function UpdateCommentForm({user, commentId, updateComment, initialValue = "", closeEditing}: AddCommentFormProps) {

    const [ comment, setComment ] = useState(initialValue);

    async function handleUpdateComment(formData: FormData) {
        await updateComment(commentId, comment);
        closeEditing();
    }

    return (
        <form action={handleUpdateComment} className={clsx([ "w-full" ])}>
            <div className="w-full flex gap-2 items-center">
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
                    closeEditing();
                }}>Cancel
                </button>
                <SubmitBtn>Update</SubmitBtn>
            </div>

        </form>
    )
}