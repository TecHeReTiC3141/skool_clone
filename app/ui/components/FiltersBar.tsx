"use client"

import { filterNames, filters } from "@/app/lib/filters";
import Link from "next/link";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export default function FiltersBar() {

    const searchParams = useSearchParams();

    const searchParamsWithoutFilter = new URLSearchParams(searchParams);
    searchParamsWithoutFilter.delete("filter");

    return (
        <div className="w-full flex gap-4">
            <Link href={`?${searchParamsWithoutFilter.toString()}`}
                  className={clsx([ "flex gap-2 items-center text-sm rounded-full p-4",
                      searchParams.get("filter") === null ? "bg-primary" : "bg-neutral hover:bg-base-300" ])}>
                All</Link>
            {filterNames.map((filter) => {
                const searchParamsWithFilter = new URLSearchParams(searchParams);
                searchParamsWithFilter.set("filter", filter);
                return (
                    <Link href={`?${searchParamsWithFilter.toString()}`} key={filter}
                          className={clsx([ "flex gap-2 items-center text-sm rounded-full p-4",
                              searchParams.get("filter") === filter ? "bg-primary" : "bg-neutral hover:bg-base-300" ])}>
                        {filters[ filter as keyof typeof filters]} {filter}</Link>
                );
            })}
        </div>
    );
}