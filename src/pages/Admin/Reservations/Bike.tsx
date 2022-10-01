import React from "react";
import { ModalLayout, ReservationList } from "components";
import { useParams, useNavigate } from "react-router-dom";

export const BikeReservations = () => {
    const { bikeId } = useParams();
    const navigate = useNavigate();

    const Goback = () => {
        navigate(-1);
    };

    return (
        <ModalLayout goBack={Goback}>
            <ReservationList bikeId={bikeId} />
        </ModalLayout>
    );
};
