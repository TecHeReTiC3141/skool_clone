import {getCommunityFromSlug} from "@/app/lib/db/community";

interface CommunityAboutPageProps {
    params: {
        slug: string,
    },
}
export default async function CommunityAboutPage({params: {slug}}: CommunityAboutPageProps) {

    const community = await getCommunityFromSlug(slug);

    return (
        <div>

        </div>
    )
}