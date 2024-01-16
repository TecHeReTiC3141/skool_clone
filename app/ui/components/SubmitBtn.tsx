import {useFormStatus} from "react-dom";
import React, {ComponentProps} from "react";


type SubmitBtnProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">

export default function SubmitBtn({children}: SubmitBtnProps) {
    const {pending} = useFormStatus();

    return (
        <button id="update-profile" className="btn btn-primary uppercase max-w-xs" disabled={pending}>{children}{
            pending && <span className="loading loading-spinner text-info"></span>
        }</button>
    )
}