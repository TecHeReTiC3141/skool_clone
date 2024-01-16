"use client"

import {useState} from "react";
import {useEdgeStore} from "@/app/lib/edgestore";
import {User} from "@prisma/client";
import {updateUserImage} from "@/app/lib/db/user";

interface FileUploadProps {
    user: User,
}

export default function FileUpload({user}: FileUploadProps) {

    const [ file, setFile ] = useState<File>();

    const {edgestore} = useEdgeStore();

    return (
        <div className="form-control gap-4">

            <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                   onChange={e => {
                       setFile(e.currentTarget.files?.[ 0 ]);
                   }}/>
            <button className="btn btn-primary btn-sm max-w-xs" onClick={async () => {
                if (file) {
                    const res = await edgestore.publicImages.upload({
                        file, options: { replaceTargetUrl: user?.image || "" },
                    });
                    await updateUserImage(user.id, res.url);
                }
            }}>
                Upload
            </button>
        </div>
    )
}