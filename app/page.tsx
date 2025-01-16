import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import FiltersBar from "@/app/ui/components/FiltersBar";
import CommunitiesGrid from "@/app/ui/components/CommunitiesGrid";

interface HomeProps {
    searchParams: {
        page?: string,
        filter: string | null,
    }
}


export default function Home({ searchParams: { page = "1", filter = null } }: HomeProps) {

    return (
        <div className="text-center text-3xl">
            <h2 className="text-[2.75rem] mt-12 font-bold tracking-tight">Discover communities</h2>
            <h4 className="text-xl my-4 tracking-tight">or <Link href="/create-new-community"
                                                                 className="text-info hover:underline">create
                your own</Link></h4>
            <form className="mt-12 mb-10">
                <div className="form-control items-center">
                    <div
                        className="input input-bordered min-w-24 py-4 max-w-[36rem] md:w-full flex gap-3 items-center shadow-lg">
                        <FaMagnifyingGlass/>
                        <input type="text" placeholder="Search for anything"
                               className="flex-1 bg-transparent font-bold"/>
                    </div>
                </div>
            </form>
            <div className="max-w-5xl mx-auto">

                <FiltersBar/>
                <CommunitiesGrid page={+page} filter={filter}/>
            </div>
        </div>
    )
}
