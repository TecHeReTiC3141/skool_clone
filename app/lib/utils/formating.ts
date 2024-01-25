export function formatMemberCount(members: number): string {
    if (members < 1000) return members.toString();
    return `${Math.round((members / 1000.) * 10) / 10}k`
}

export function formatPrice(price: number): string {
    let pr = `${Math.round((price / 100.) * 100) / 100.}`;
    if (!pr.includes(".")) return "$" + pr + ".00";
    return `\$${Math.round((price / 100.) * 100) / 100.}`;
}

export function formatTimeAgo(creationDate: Date): string {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - creationDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}h ago`;
    } else if (minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return `${seconds}s ago`;
    }
}
