import React from "react";
import { BikesList, FilterForm } from "components/";
import { FilterType } from "utils";

export const UserHome = () => {
    const [filters, setFilters] = React.useState<FilterType>();

    return (
        <div>
            <h3 className="text-3xl font-bold mb-3">List of bikes</h3>
            <div className="flex">
                <div className="w-full">
                    <BikesList filters={filters} />
                </div>
                <FilterForm applyFilters={setFilters} />
            </div>
        </div>
    );
};
