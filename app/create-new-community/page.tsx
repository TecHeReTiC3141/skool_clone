import {checkAuthenticated} from "@/app/api/auth/authMiddleware";
import CreateCommunityForm from "@/app/create-new-community/CreateCommunityForm";

export default async  function CreateCommunityPage() {
    const user = await checkAuthenticated();

    return (
        <CreateCommunityForm user={user} />
    )
}