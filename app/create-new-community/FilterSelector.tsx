"use client"

import Select from 'react-select';
import {filterOptions} from "@/app/lib/filters";
import React from "react";

interface FilterSelectorProps {
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
}

export default function FilterSelector({setFilter}: FilterSelectorProps) {
    return (
        <Select
            isMulti
            name="filters"
            options={filterOptions}
            onChange={(selectedOptions) => {
                console.log(selectedOptions);
                const filters: string[] = [];
                for (let opt of selectedOptions) {
                    filters.push(opt.value);
                }
                setFilter(filters);
            }}
            className="basic-multi-select bg-primary"
            classNamePrefix="select"
        />
    )
}