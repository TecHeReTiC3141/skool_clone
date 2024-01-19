"use server"

import prisma from "@/app/lib/db/prisma";
import {Community, CommunityAccessLevel} from "@prisma/client";
import {redirect} from "next/navigation";
import slugify from "slugify";

export type CreateCommunityData = {
    creatorId: string,
    name: string,
    price: number,
    accessLevel: CommunityAccessLevel,
    thumb: string,
    icon: string,
    filters: string[],
    description: string,
}

export async function createCommunity({creatorId, name, price, accessLevel, thumb, filters, icon, description}: CreateCommunityData) {
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
            members: {
                connect: { id: creatorId }
            }
        }
    });
    return redirect(`/communities/${slug}`);
}

export type CommunityWithMembers = Community & {_count: { members: number }};

export async function getMainPageCommunities(): Promise<CommunityWithMembers[]> {
    return await prisma.community.findMany({
        orderBy: { memberCount: "desc" },
        include: {
            _count: {
                select: { members: true },
            }
        }
    })
}