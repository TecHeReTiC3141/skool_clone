"use client"

import Image from "next/image";

interface CarouselProps {
    pics: string[]
}

export default function Carousel({pics}: CarouselProps) {
    return (
        <div className="carousel w-full rounded-lg overflow-hidden">
            {pics.map((pic, index) => (

                <div key={pic} id={`slide${index}`} className="carousel-item relative w-full">
                    <Image src={pic} alt="About photos" width={800} height={600} className="w-full max-h-96 rounded-lg object-cover" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${(index + pics.length - 1) % pics.length}`} className="btn btn-circle">❮</a>
                        <a href={`#slide${(index + 1) % pics.length}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            ))}
        </div>
    )
}