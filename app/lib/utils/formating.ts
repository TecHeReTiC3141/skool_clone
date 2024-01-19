export function formatMemberCount(members: number): string {
    if (members < 1000) return members.toString();
    return `${Math.round((members / 1000.) * 10) / 10}k`
}