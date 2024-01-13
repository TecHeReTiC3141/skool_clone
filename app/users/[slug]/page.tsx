import {getServerSession} from "next-auth";
import prisma from "@/app/lib/db/prisma";

export default async function UserProfilePage({params: {slug}}: { params: { slug: string } }) {
    const session = await getServerSession();

    const user = await prisma.user.findUnique({
        where: {
            slug,
        }
    });

    if (!user) {
        return (
            <h3>This user not found, maybe he does not exist or hidden</h3>
        )
    }
    return (
        <div>
            User {user.name}
        </div>
    )
}