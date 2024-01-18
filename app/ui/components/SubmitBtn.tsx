import {useFormStatus} from "react-dom";
import React, {ComponentProps} from "react";
import clsx from "clsx";


type SubmitBtnProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">

export default function SubmitBtn({children, className}: SubmitBtnProps) {
    const {pending} = useFormStatus();

    return (
        <button id="submit-btn" className={clsx(["btn btn-primary uppercase", className])} disabled={pending}>{children}{
            pending && <span className="loading loading-spinner text-info"></span>
        }</button>
    )
}