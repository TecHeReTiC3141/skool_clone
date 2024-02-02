"use client"

import { useUrl } from "nextjs-current-url";


export default function CopyLinkButton() {

    const {href: currentUrl} = useUrl() ?? {};
    return (
        <button onClick={async () => {await navigator.clipboard.writeText(currentUrl || "")}}>Copy the link</button>
    )
}