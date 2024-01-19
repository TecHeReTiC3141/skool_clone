import Link from "next/link";
import {Community} from "@prisma/client";
import Image from "next/image";

interface CommunityCardProps {
    community: Community,
}

export default function CommunityCard({ community }: CommunityCardProps) {
    return (
        <Link href={`/communities/${community.slug}`}>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                    <Image src={community.thumb} alt={community.name + " thumb"} width={360} height={360} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{community.name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}