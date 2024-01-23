"use server"

import prisma from "@/app/lib/db/prisma";
import {Community, CommunityAccessLevel} from "@prisma/client";
import {redirect} from "next/navigation";
import slugify from "slugify";
import {SessionUser} from "@/app/lib/db/user";

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

export async function createCommunity({
                                          creatorId,
                                          name,
                                          price,
                                          accessLevel,
                                          thumb,
                                          filters,
                                          icon,
                                          description
                                      }: CreateCommunityData) {
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
                connect: {id: creatorId}
            }
        }
    });
    return redirect(`/communities/${slug}`);
}

export type CommunityWithMemberCount = Community & { _count: { members: number } };

export type CommunityWithMembers = Community & { members: SessionUser[] };


export async function getMainPageCommunities(): Promise<CommunityWithMemberCount[]> {
    return await prisma.community.findMany({
        orderBy: {
            members: {
                _count: "desc",
            }
        },
        include: {
            _count: {
                select: {members: true},
            },
        }
    });
}

export async function getCommunityFromSlug(slug: string): Promise<(CommunityWithMemberCount & CommunityWithMembers) | null> {
    return await prisma.community.findUnique({
        where: { slug },
        include: {
            _count: {
                select: {members: true},
            },
            members: {
                select: {
                    image: true,
                    id: true,
                    slug: true,
                    email: true,
                    name: true,
                }
            },
        }
    })
}

export async function checkIfUserInCommunity(userId: string, communityId: string) {
    const community = await prisma.community.findUnique({
        where: {
            id: communityId,
        },
        select: {
            members: {
                where: {
                    id: userId,
                }
            }
        }
    });
    return community && community.members.length > 0;
}