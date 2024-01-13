import Link from "next/link";

export default function NotFound() {
    return (
        <div className="border border-neutral rounded-lg p-4 w-fit m-auto flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">
            <p className="text-lg">Sorry, page you are looking for not found</p>
            <Link href="/" className="btn btn-primary">Go home</Link>
        </div>
    )
}