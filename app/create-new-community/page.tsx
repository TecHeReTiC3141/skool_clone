"use client"

import {useState} from "react";
import {useEdgeStore} from "@/app/lib/edgestore";
import {SingleImageDropzone} from "@/app/ui/components/SingleImageDropzone";
import {createCommunity} from "@/app/lib/db/community";
import {CommunityAccessLevel} from "@prisma/client";
import FilterSelector from "@/app/create-new-community/FilterSelector";
import SubmitBtn from "@/app/ui/components/SubmitBtn";

export default function CreateCommunityForm() {
    // TODO: implement alert system for errors and other messages
    const [ file, setFile ] = useState<File>();
    const [ filters, setFilters ] = useState<string[]>([]);
    const [ progress, setProgress ] = useState(0);
    const {edgestore} = useEdgeStore();

    async function handleSubmit(formData: FormData) {
        if (!file) return;

        const res = await edgestore.publicImages.upload({
            file,
            input: {type: "community"},
            onProgressChange: (progress) => {
                setProgress(progress);
            },
        });

        const data = {
            name: formData.get("name") as string,
            price: Number(formData.get("price") as string) * 100,
            accessLevel: formData.get("access-level")?.toString().toUpperCase() as CommunityAccessLevel,
            thumb: res.url,
            filters,
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
                            <select className="select w-full max-w-xs" name="access-level">
                                <option disabled selected>Access level</option>
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
                            value={file}
                            className="w-full"
                            onChange={(file) => {
                                setFile(file);
                            }}
                        />
                        <progress className="progress w-full transition-all duration-200 mb-2" value={progress}
                                  max="100"></progress>
                    </label>


                    <SubmitBtn className="btn-block">
                        Create community
                    </SubmitBtn>
                </form>
            </div>
        </div>
    )
}