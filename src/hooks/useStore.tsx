import { useCallback, useEffect, useState } from "react";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { fireDB } from "libs/";
import { AuthUserType, BIKES_DB_REF, BikeType, FilterType, isAdmin, RatingType, ReservationType, ROLES } from "utils/";
import { useAuth } from "./useAuth";

interface Props {
    bike?: BikeType;
    reservation?: ReservationType;
    filters?: FilterType;
    bikeId?: string;
    userId?: string;
}

export const useStore = ({ bike, reservation, filters, userId, bikeId }: Props) => {
    const { auth } = useAuth();
    const [bikes, setBikes] = useState<BikeType[]>([]);
    const [loadingBikes, setLoadingBikes] = useState(true);
    const [bikeResa, setBikeReservation] = useState<ReservationType[]>([]);
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    const [loadingResa, setLoadingResa] = useState(true);
    const [userRate, setUserRate] = useState<RatingType>();
    const [bikeRating, setBikeRating] = useState(0);
    const [userList, setUserList] = useState<AuthUserType[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [managerList, setManagerList] = useState<AuthUserType[]>([]);
    const [loadingManagers, setLoadingManagers] = useState(true);

    useEffect(() => {
        if (reservation) {
            const rating_listener = onSnapshot(
                query(
                    collection(fireDB, "ratings"),
                    where("bikeId", "==", reservation.bikeId),
                    where("userId", "==", reservation.userId)
                ),
                (snapshot) => {
                    let data: RatingType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as RatingType);
                    });
                    if (data.length) setUserRate(data[0]);
                }
            );

            return () => {
                rating_listener();
            };
        }
    }, [reservation]);

    useEffect(() => {
        if (isAdmin(auth)) {
            const usersListener = onSnapshot(
                query(collection(fireDB, "users_extend"), where("roles", "array-contains", ROLES.User)),
                (snapshot) => {
                    let data: AuthUserType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as AuthUserType);
                    });
                    setUserList(data.sort((a, b) => b.timestamp! - a.timestamp!));
                    setLoadingUsers(false);
                }
            );

            const adminsListener = onSnapshot(
                query(collection(fireDB, "users_extend"), where("roles", "array-contains", ROLES.Admin)),
                (snapshot) => {
                    let data: AuthUserType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as AuthUserType);
                    });
                    setManagerList(data.sort((a, b) => b.timestamp! - a.timestamp!));
                    setLoadingManagers(false);
                }
            );

            return () => {
                usersListener();
                adminsListener();
            };
        }
    }, [auth]);

    useEffect(() => {
        // Should not fire if a bikeIf , a userId or a bike is defined
        if (auth?.user && !(userId || bikeId)) {
            let req = query(collection(fireDB, "reservations"), where("userId", "==", auth.user.uid));

            if (isAdmin(auth)) {
                req = query(collection(fireDB, "reservations"), orderBy("timestamp", "desc"));
            }

            const reservationListener = onSnapshot(req, (snapshot) => {
                let data: ReservationType[] = [];
                snapshot.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id } as ReservationType);
                });
                setReservations(data.sort((a, b) => b.timestamp - a.timestamp));
                setLoadingResa(false);
            });

            return () => {
                reservationListener();
            };
        }
        if (!(userId || bikeId)) setLoadingResa(false);
    }, [auth, userId, bikeId]);

    useEffect(() => {
        if (!!bikeId) {
            const _reservations_listener = onSnapshot(
                query(collection(fireDB, "reservations"), where("bikeId", "==", bikeId)),
                (snapshot) => {
                    let data: ReservationType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as ReservationType);
                    });
                    setReservations(data);
                    setLoadingResa(false);
                }
            );
            return () => {
                _reservations_listener();
            };
        }
    }, [bikeId]);

    useEffect(() => {
        if (!!userId) {
            const reservations_listener = onSnapshot(
                query(collection(fireDB, "reservations"), where("userId", "==", userId)),
                (snapshot) => {
                    let data: ReservationType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as ReservationType);
                    });
                    setReservations(data);
                    setLoadingResa(false);
                }
            );
            return () => {
                reservations_listener();
            };
        }
    }, [userId]);

    useEffect(() => {
        if (bike) {
            const bike_reservations_listener = onSnapshot(
                query(collection(fireDB, "reservations"), where("bikeId", "==", bike.id)),
                (snapshot) => {
                    let data: ReservationType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as ReservationType);
                    });
                    setBikeReservation(data);
                    setLoadingResa(false);
                }
            );

            const bike_ratings_listener = onSnapshot(
                query(collection(fireDB, "ratings"), where("bikeId", "==", bike.id)),
                (snapshot) => {
                    let data: RatingType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as RatingType);
                    });
                    if (!!data.length)
                        setBikeRating(data.reduce((sum, rating) => (sum += rating.rating), 0) / data.length);
                }
            );

            return () => {
                bike_reservations_listener();
                bike_ratings_listener();
            };
        }
    }, [bike]);

    const filterBike = useCallback(
        (bike: BikeType): boolean => {
            const { color, location, model } = filters!;
            let output = true;
            if (color && !(bike.color === color)) output = false;
            if (model && !(bike.model === model)) output = false;
            if (location && !(bike.location === location)) output = false;

            return output;
        },
        [filters]
    );

    useEffect(() => {
        let req = query(BIKES_DB_REF, orderBy("lastupdate", "desc"), limit(100));

        /*
            Unable to set may conditions "where" with optional values filter
            The request will be done with one attributes and the result will be filtred again
        */
        if (filters) {
            const { color, location, model } = filters;
            if (color) {
                req = query(BIKES_DB_REF, where("color", "==", color), limit(100));
            } else if (location) {
                req = query(BIKES_DB_REF, where("location", "==", location), limit(100));
            } else if (model) {
                req = query(BIKES_DB_REF, where("model", "==", model), limit(100));
            }
        }
        const bikesListener = onSnapshot(req, (snapshot) => {
            let data: BikeType[] = [];
            snapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id } as BikeType);
            });
            if (filters) {
                data = data.filter((bike) => filterBike(bike));
            }
            setBikes(data);
            setLoadingBikes(false);
        });

        return () => {
            bikesListener();
        };
    }, [filters, filterBike]);

    return {
        bikes,
        loadingBikes,
        bikeResa,
        reservations,
        loadingResa,
        userRate,
        bikeRating,
        userList,
        loadingUsers,
        managerList,
        loadingManagers,
    };
};
