import React, { useCallback, useState } from "react";
import Icon from "@mdi/react";
import { mdiMotorbike } from "@mdi/js";
import { BikeType, FilterType, getTime, isDateBetween } from "utils/";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import { ErrorBoundary } from "./ErrorBoundary";
import { useAuth, useStore } from "hooks/";
import { addReservation } from "api/";
import { Alert } from "./Alert";

export const BikeCard: React.FC<{ bike: BikeType; filters?: FilterType }> = ({ bike, filters }) => {
    const { auth } = useAuth();
    const { bikeResa, bikeRating } = useStore({ bike });
    const { model, color, location } = bike;
    const [calenVisible, setCalendarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const isAvailableDuringPeriod = useCallback(
        (_enDate: Date, _startDate: Date): boolean => {
            /*
                A reservation is pending if the end date is greater than today
            */

            let pendingResa = bikeResa.filter((resa) => getTime(new Date(resa.endDate)) >= getTime(new Date()));

            /*
                We check that the chosen period does not cross any other
            */

            return pendingResa.reduce((av, resa) => {
                if (
                    isDateBetween(new Date(resa.endDate), new Date(resa.startDate), new Date(_enDate)) ||
                    isDateBetween(new Date(resa.endDate), new Date(resa.startDate), new Date(_startDate)) ||
                    isDateBetween(new Date(_enDate), new Date(_startDate), new Date(resa.startDate))
                )
                    return false;
                return av;
            }, true);
        },
        [bikeResa]
    );

    const reserveBike = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range;
        setLoading(true);
        setSuccess(false);
        setError("");

        if (!isAvailableDuringPeriod(endDate, startDate)) {
            setCalendarVisible(false);
            setLoading(false);
            return setError("Not available for this period");
        }

        addReservation(bike, startDate.toUTCString(), endDate.toUTCString(), auth!)
            .then(() => {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
            .catch((e) => setError(e))
            .finally(() => {
                setLoading(false);
                setCalendarVisible(false);
            });
    };

    if (filters) {
        const { rating, dateRange } = filters;
        if ((rating || 0) > bikeRating) return null;
        if (dateRange) {
            if (!isAvailableDuringPeriod(dateRange.endDate, dateRange.startDate)) return null;
        }
    }

    return (
        <div className="box rounded overflow-hidden shadow-md border">
            <div className="flex items-center px-3 py-3">
                <Icon path={mdiMotorbike} size={1} color="black" />
                <span className="pl-2 text-sm font-bold ">{model}</span>
            </div>
            <div className="p-3">
                <table className="text-sm text-left text-gray-500">
                    <tbody>
                        <tr>
                            <td>Color :</td>
                            <td>{color}</td>
                        </tr>
                        <tr>
                            <td>Location :</td>
                            <td>{location}</td>
                        </tr>
                        <tr>
                            <td>Rating :</td>
                            <td>{`${bikeRating > 0 ? bikeRating : "..."}`} / 5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className=" mt-3 h-10">
                {success && <Alert message="Reservation complete" type="success" />}
                {error && <Alert message={error} />}
            </div>

            <div className="bg-gray-100 p-2 flex">
                <button
                    className=" ml-auto block text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-2 py-1 text-center"
                    type="button"
                    onClick={() => setCalendarVisible(true)}
                >
                    Reserve this bike
                </button>
            </div>

            <ErrorBoundary>
                <CalendarDateRangePicker
                    visible={calenVisible}
                    hideCalendar={() => setCalendarVisible(false)}
                    loading={loading}
                    validate={reserveBike}
                />
            </ErrorBoundary>
        </div>
    );
};
