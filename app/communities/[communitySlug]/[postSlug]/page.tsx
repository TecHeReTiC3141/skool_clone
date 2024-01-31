interface CommunityPostProps {
    params: {
        postSlug: string,
    }
}

export default function CommunityPost({params: {postSlug}}: CommunityPostProps) {
    return (
        <div>{postSlug}</div>
    )
}