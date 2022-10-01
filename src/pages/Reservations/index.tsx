import React from "react";
import { ReservationList } from "components";

export const Reservation = () => {
    return (
        <div>
            <h3 className="text-3xl font-bold ">List of reservations</h3>
            <ReservationList />
        </div>
    );
};
