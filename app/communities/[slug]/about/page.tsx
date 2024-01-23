import {getCommunityFromSlug} from "@/app/lib/db/community";
import {redirect} from "next/navigation";

interface CommunityAboutPageProps {
    params: {
        slug: string,
    },
}
export default async function CommunityAboutPage({params: {slug}}: CommunityAboutPageProps) {
    console.log("in about page", slug);
    const community = await getCommunityFromSlug(slug);

    if (!community) {
        return redirect("/404");
    }

    return (
        <div>
            About {community.name}
        </div>
    )
}