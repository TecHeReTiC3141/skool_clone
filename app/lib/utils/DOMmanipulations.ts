export function closeDropdown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
        elem.blur();
    }
}