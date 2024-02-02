import { FaApple, FaBookOpen, FaBrush, FaGuitar, FaMoneyBillTrendUp } from "react-icons/fa6";
import type { JSX } from "react";

export interface FilterOption {
    readonly value: string;
    readonly label: string;
}

export const filterOptions: readonly FilterOption[] = [
    { value: 'business', label: 'Business', },
    { value: 'health & fitness', label: 'Health & fitness', },
    { value: 'personal development', label: 'Personal development',},
    { value: 'arts & crafts', label: 'Arts & crafts',  },
    { value: 'music', label: 'Music', },
];

export type FilterName = "business" | "health & fitness" |  "personal development" | "arts & crafts" | "music";

export type Filters = {
    [key in FilterName]: JSX.Element;
};

export const filters: Filters = {
    business: <FaMoneyBillTrendUp />,
    "health & fitness": <FaApple />,
    "personal development": <FaBookOpen />,
    "arts & crafts": <FaBrush />,
    "music": <FaGuitar />,
}

export const filterNames = Object.keys(filters);
