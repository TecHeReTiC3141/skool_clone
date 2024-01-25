"use client"

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {POSTS_ON_PAGE} from "@/app/lib/params";
import type {JSX} from "react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";


interface PaginationProps {
    currentPage: number,
    totalPosts: number,
}

export default function PaginationBar({currentPage, totalPosts}: PaginationProps) {
    const totalPages = Math.floor((totalPosts + POSTS_ON_PAGE - 1) / POSTS_ON_PAGE);
    const pathname = usePathname(), searchParams = useSearchParams();
    const pagesBtns: JSX.Element[] = [];

    if (totalPages === 1) return <></>

    const firstPageSearchParams = new URLSearchParams(searchParams);
    firstPageSearchParams.set("page", "1");

    const lastPageSearchParams = new URLSearchParams(searchParams);
    lastPageSearchParams.set("page", totalPages.toString());

    const prevPageSearchParams = new URLSearchParams(searchParams);
    prevPageSearchParams.set("page", (currentPage - 1).toString());
    const nextPageSearchParams = new URLSearchParams(searchParams);
    nextPageSearchParams.set("page", (currentPage + 1).toString());

    if (currentPage < Math.min(5, totalPages)) {
        for (let page = 1; page <= Math.min(5, totalPages); ++page) {
            const newPageSearchParams = new URLSearchParams(searchParams);
            newPageSearchParams.set("page", page.toString());

            pagesBtns.push(<Link href={`${pathname}?${newPageSearchParams.toString()}`}
                                 className="btn btn-circle btn-ghost">{page}</Link>);

        }
        if (totalPages > 5) {

            pagesBtns.push(<button disabled className="">...</button>);
            pagesBtns.push(<Link href={`${pathname}?${lastPageSearchParams.toString()}`}
                                 className="btn btn-circle btn-ghost">{totalPages}</Link>);
        }
    } else if (totalPages - currentPage < 5) {
        if (totalPages > 5) {
            pagesBtns.push(<Link href={`${pathname}?${firstPageSearchParams.toString()}`}
                                 className="btn btn-circle btn-ghost">1</Link>);
            pagesBtns.push(<button disabled className="">...</button>);
        }
        for (let page = Math.max(totalPages - 4, 1); page <= totalPages; ++page) {
            const newPageSearchParams = new URLSearchParams(searchParams);
            newPageSearchParams.set("page", page.toString());

            pagesBtns.push(<Link href={`${pathname}?${newPageSearchParams.toString()}`}
                                 className="btn btn-circle btn-ghost">{page}</Link>);
        }
    } else {
        pagesBtns.push(<Link href={`${pathname}?${firstPageSearchParams.toString()}`}
                             className="btn btn-circle btn-ghost">1</Link>);
        pagesBtns.push(<button disabled className="">...</button>);

        const prevPageSearchParams = new URLSearchParams(searchParams);
        prevPageSearchParams.set("page", (currentPage - 1).toString());
        pagesBtns.push(<Link href={`${pathname}?${prevPageSearchParams.toString()}`}
                             className="btn btn-circle btn-ghost">{currentPage - 1}</Link>);

        const curPageSearchParams = new URLSearchParams(searchParams);
        curPageSearchParams.set("page", currentPage.toString());
        pagesBtns.push(<Link href={`${pathname}?${curPageSearchParams.toString()}`}
                             className="btn btn-circle btn-ghost">{currentPage}</Link>);

        const nextPageSearchParams = new URLSearchParams(searchParams);
        nextPageSearchParams.set("page", (currentPage + 1).toString());
        pagesBtns.push(<Link href={`${pathname}?${nextPageSearchParams.toString()}`}
                             className="btn btn-circle btn-ghost">{currentPage + 1}</Link>);


        pagesBtns.push(<button disabled className="">...</button>);
        pagesBtns.push(<Link href={`${pathname}?${lastPageSearchParams.toString()}`}
                             className="btn btn-circle btn-ghost">{totalPages}</Link>);
    }
    return (
        <div className="my-4 px-2 w-full flex gap-2 justify-between items-center">

            <div className="flex gap-4">
                {currentPage > 1 && <Link href={`${pathname}?${prevPageSearchParams.toString()}`}
                       className="btn rounded-full btn-ghost text-sm"><FaAngleLeft/> Previous</Link>}
                {pagesBtns}
                {currentPage < totalPages && <Link href={`${pathname}?${nextPageSearchParams.toString()}`}
                       className="btn rounded-full btn-ghost text-sm">Next <FaAngleRight/></Link>}
            </div>
            <p className="text-sm">{(currentPage - 1) * POSTS_ON_PAGE + 1}-{currentPage * POSTS_ON_PAGE} of {totalPosts}</p>
        </div>
    )
}