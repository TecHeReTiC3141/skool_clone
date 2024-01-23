export function formatMemberCount(members: number): string {
    if (members < 1000) return members.toString();
    return `${Math.round((members / 1000.) * 10) / 10}k`
}

export function formatPrice(price: number): string {
    let pr = `${Math.round((price / 100.) * 100) / 100.}`;
    if (!pr.includes(".")) return pr + ".00$";
    return `${Math.round((price / 100.) * 100) / 100.}$`;
}