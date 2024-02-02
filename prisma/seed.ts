import prisma from "@/app/lib/db/prisma";
import { CommunityAccessLevel, CommunityUserRole } from "@prisma/client";
import { PostCreateData } from "@/app/lib/db/post";


async function seed() {
    // const users: (UserCredentials & { slug: string })[] = [];
    for (let i = 0; i < 50; ++i) {
        await prisma.user.upsert({
            where: { email: `test${i}@mail.ru` },
            create: { name: `TestUser${i}`, email: `test${i}@mail.ru`, password: "123", slug: `TestUser${i}-100` },
            update: {}
        });
    }
    const creatorId = (await prisma.user.findFirstOrThrow({
        select: { id: true }
    })).id;
    for (let i = 0; i < 100; ++i) {
        const data = {
            name: `TestCommunity${i}`,
            price: Math.round(Math.random() * 100),
            accessLevel: CommunityAccessLevel.PUBLIC,
            thumb: "https://files.edgestore.dev/x1dag92dl2oadwkg/publicImages/_public/community/thumb/40559e43-2216-4d24-bf43-90dba85fdeee.png",
            icon: "https://files.edgestore.dev/x1dag92dl2oadwkg/publicImages/_public/community/icon/4e72bc2a-562e-4793-9d21-5b4dea5ad16e.jpg",
            description: `This is a generic description of community TestCommunity${i}`,
            aboutDescription: `This is a about description of community TestCommunity${i}`,
            aboutImages: [],
            filters: [],
        };
        await prisma.community.upsert({
            where: { name: data.name },

            create: {
                slug: `${data.name}-100`,
                ...data,
                creator: {
                    connect: { id: creatorId }
                },
                members: {
                    create: {
                        userId: creatorId,
                        role: CommunityUserRole.ADMIN,
                    }
                }
            },
            update: {}
        });
    }
    const communityId = (await prisma.community.findFirstOrThrow({
        select: { id: true }
    })).id;
    for (let i = 0; i < 100; ++i) {
        const data: PostCreateData = {
            title: `Post ${i}`,
            content: `This is a very interesting post`,
            creatorId,
            communityId,
        }
        await prisma.post.upsert({
            where: { slug: `${data.title}-100` },
            create: {
                ...data,
                slug: `${data.title}-100`,
            },
            update: {},
        });
    }
}

seed()
    .then(() => console.log("DB successfully seeded"))
    .catch(err => console.error("Error while seeding " + err))
    .finally(async () => await prisma.$disconnect());