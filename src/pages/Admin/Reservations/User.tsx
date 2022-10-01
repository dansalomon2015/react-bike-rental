import React from "react";
import { ModalLayout, ReservationList } from "components";
import { useNavigate, useParams } from "react-router-dom";

export const UserReservations = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const Goback = () => {
        navigate(-1);
    };

    return (
        <ModalLayout goBack={Goback}>
            <ReservationList userId={userId} />
        </ModalLayout>
    );
};
