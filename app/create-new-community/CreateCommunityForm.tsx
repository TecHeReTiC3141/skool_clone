"use client"

import {useState} from "react";
import {useEdgeStore} from "@/app/lib/edgestore";
import {CommunityAccessLevel} from "@prisma/client";
import {createCommunity} from "@/app/lib/db/community";
import FilterSelector from "@/app/create-new-community/FilterSelector";
import {SingleImageDropzone} from "@/app/ui/components/SingleImageDropzone";
import SubmitBtn from "@/app/ui/components/SubmitBtn";
import {SessionUser} from "@/app/lib/db/user";


interface CreateCommunityFormProps {
    user: SessionUser,
}

export default function CreateCommunityForm({user}: CreateCommunityFormProps) {
    // TODO: implement alert system for errors and other messages
    const [ thumb, setThumb ] = useState<File>();
    const [ icon, setIcon ] = useState<File>();
    const [ filters, setFilters ] = useState<string[]>([]);
    const [ progress, setProgress ] = useState(0);
    const {edgestore} = useEdgeStore();

    async function handleSubmit(formData: FormData) {
        if (!thumb || !icon || !user) return;

        const resThumb = await edgestore.publicImages.upload({
            file: thumb,
            input: {type: "community/thumb"},
            onProgressChange: (progress) => {
                setProgress(progress);
            },
        });

        const resIcon = await edgestore.publicImages.upload({
            file: icon,
            input: {type: "community/icon"},
            onProgressChange: (progress) => {
                setProgress(progress);
            },
        });

        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price") as string) * 100,
            accessLevel: formData.get("access-level")?.toString().toUpperCase() as CommunityAccessLevel,
            thumb: resThumb.url,
            icon: resIcon.url,
            filters,
            creatorId: user.id,
        }

        console.log(data, Object.fromEntries(formData));

        await createCommunity(data);

    }

    return (
        <div className="flex justify-center items-center">
            <div className="rounded-lg shadow-lg flex flex-col items-center bg-neutral px-4 py-3 my-4 w-96">
                <h3 className="text-2xl font-bold">Create your community</h3>
                <form action={handleSubmit} className="mt-4 w-full">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Group name</span>
                        </div>
                        <input type="text" className="input input-bordered" name="name" placeholder="My community..."
                               required/>
                    </label>
                    <div className="flex justify-between">

                        <label className="form-control w-[45%]">
                            <div className="label">
                                <span className="label-text">Access level</span>
                            </div>
                            <select className="select w-full max-w-xs" name="access-level" defaultValue="default">
                                <option disabled value="default">Access level</option>
                                <option>Private</option>
                                <option>Public</option>
                            </select>
                        </label>
                        <label className="form-control w-[45%]">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="number" name="price" className="input input-bordered" min={0}
                                   defaultValue={0}/>
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Community description</span>
                        </div>
                        <textarea name="description" className="textarea textarea-bordered"
                                  placeholder="Describe briefly your community. Min chars count - 50, max - 1000 "
                                  minLength={50} maxLength={1000} required>
                        </textarea>
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Community topics</span>
                        </div>
                        <FilterSelector setFilter={setFilters}/>
                    </label>

                    <label className="form-control w-full mt-4">
                        <div className="label">
                            <span className="label-text">Community picture (thumbnail)</span>
                        </div>
                        <SingleImageDropzone
                            width={350}
                            height={350}
                            value={thumb}
                            className="w-full"
                            onChange={(file) => {
                                setThumb(file);
                            }}
                        />
                        <progress className="progress w-full transition-all duration-200 mb-2" value={progress}
                                  max="100"></progress>
                    </label>

                    <label className="form-control w-full flex-row mt-4 justify-between gap-4">

                        <SingleImageDropzone
                            width={60}
                            height={60}
                            value={icon}
                            className="w-full"
                            onChange={(file) => {
                                setIcon(file);
                            }}
                        />
                        <div className="label">
                            <span className="label-text">Community icon (100x100px optimally)</span>
                        </div>
                    </label>


                    <SubmitBtn className="btn-block mt-4">
                        Create community
                    </SubmitBtn>
                </form>
            </div>
        </div>
    )
}