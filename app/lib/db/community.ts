"use server"

import prisma from "@/app/lib/db/prisma";
import {CommunityAccessLevel} from "@prisma/client";
import {redirect} from "next/navigation";
import slugify from "slugify";

export type CreateCommunityData = {
    name: string,
    price: number,
    accessLevel: CommunityAccessLevel,
    thumb: string,
    filters: string[],
}

export async function createCommunity({name, price, accessLevel, thumb, filters}: CreateCommunityData) {
    const slug = slugify(name, {lower: true});
    await prisma.community.create({
        data: {
            name,
            price,
            accessLevel,
            thumb,
            slug,
            filters,
        }
    });
    return redirect(`/communities/${slug}`);
}