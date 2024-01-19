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
    icon: string,
    filters: string[],
    description: string,
}

export async function createCommunity({name, price, accessLevel, thumb, filters, icon, description}: CreateCommunityData) {
    const slug = slugify(name, {lower: true});
    await prisma.community.create({
        data: {
            name,
            price,
            accessLevel,
            thumb,
            slug,
            filters,
            icon,
            description,
        }
    });
    return redirect(`/communities/${slug}`);
}

export async function getAllCommunities() {
    return await prisma.community.findMany({
        orderBy: { memberCount: "desc" },
    })
}