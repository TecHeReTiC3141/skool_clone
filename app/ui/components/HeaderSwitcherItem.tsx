import {IconType} from "react-icons";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

interface HeaderSwitcherItem {
    Icon: string | IconType,
    text: string,
    url: string
}

export default function HeaderSwitcherItem({Icon, text, url}: HeaderSwitcherItem) {
    const pathname = usePathname();

    return (
        <Link href={url} className={clsx(["w-full hover:bg-neutral flex items-center py-3 px-2 gap-3", (url === pathname || url !== "/" && pathname.startsWith(url)) && "bg-primary hover:bg-primary"])} >
            {typeof Icon === "string" ? <Image src={Icon} alt={text} width={160} height={160} className="rounded-lg w-8 h-8 object-cover"/> :
                <Icon className="h-8 w-8 p-2 text-lg bg-neutral rounded-lg" />}
            <p className="font-bold">{text}</p>
        </Link>
    )
}