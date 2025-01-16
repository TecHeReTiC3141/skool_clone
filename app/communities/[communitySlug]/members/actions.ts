"use server"

import { UserOfUserList } from "@/app/users/[userSlug]/actions";
import prisma from "@/app/lib/db/prisma";
import { CommunityUserRole } from "@prisma/client";

export interface CommunityMembersListData {
    members: ({
        user: UserOfUserList,
    })[]
}

export async function getCommunityMembers(communitySlug: string): Promise<CommunityMembersListData | null> {
    return prisma.community.findUnique({
        where: {
            slug: communitySlug,
        },
        select: {
            members: {
                where: {
                    role: CommunityUserRole.MEMBER,
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            slug: true,
                            image: true,
                        }
                    }
                }
            }
        }
    })
}

export async function getCommunityAdmins(communitySlug: string): Promise<CommunityMembersListData | null> {
    return prisma.community.findUnique({
        where: {
            slug: communitySlug,
        },
        select: {
            members: {
                where: {
                    role: CommunityUserRole.ADMIN,
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            slug: true,
                            image: true,
                        }
                    }
                }
            }
        }
    })
}

export async function getAllCommunityMembers(communitySlug: string): Promise<CommunityMembersListData | null> {
    return prisma.community.findUnique({
        where: {
            slug: communitySlug,
        },
        select: {
            members: {
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            slug: true,
                            image: true,
                        }
                    }
                }
            }
        }
    })
}

export type CommunityMemberCounts = {
    [key in CommunityUserRole]: number
};


export async function getCommunityMemberCounts(communityId: string): Promise<CommunityMemberCounts> {
    const counts = (await prisma.communityMembership.groupBy({
        by: "role",
        where: { communityId },
        _count: {
            _all: true
        }
    }))!;

    const res: CommunityMemberCounts = {} as CommunityMemberCounts;
    for (let { role, _count } of counts) {
        res[ role ] = _count._all;
    }
    return res;

}