import React, { FC } from "react";
import { BikeCard } from "./BikeCard";
import { useStore } from "hooks/";
import { FilterType } from "utils/";

export const BikesList: FC<{ filters?: FilterType }> = ({ filters }) => {
    const { bikes, loadingBikes } = useStore({ filters });
    return (
        <div className="grid overflow-hidden grid-cols-4 grid-rows-3 gap-3.5">
            {loadingBikes ? (
                <span className="text-xs">Loading bikes list...</span>
            ) : !bikes.length ? (
                <span className="text-xs">No data found</span>
            ) : (
                bikes.map((bike) => (bike.available ? <BikeCard bike={bike} key={bike.id} filters={filters} /> : null))
            )}
        </div>
    );
};
