import {FaApple, FaBookOpen, FaBrush, FaGuitar, FaMoneyBillTrendUp} from "react-icons/fa6";

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

export const filters = {
    business: <FaMoneyBillTrendUp />,
    "health & fitness": <FaApple />,
    "personal development": <FaBookOpen />,
    "arts & crafts": <FaBrush />,
    "music": <FaGuitar />,
}

export const filterNames = Object.keys(filters);
