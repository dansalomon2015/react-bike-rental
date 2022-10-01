import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { fireAuth, fireDB } from "libs/";
import { AuthUserType, BIKES_DB_REF, BikeType, LocationType, RatingType, ReservationType, ROLE } from "utils/";

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(fireAuth, email, password);
};

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(fireAuth, email, password);
};

export const logOut = async () => {
    await signOut(fireAuth);
};

export const sendVerificationEmail = async (user: User) => {
    return sendEmailVerification(user);
};

export const saveUser = async (
    username: string,
    email: string,
    userId: string,
    roles: ROLE[],
    location: string,
    createdBy?: string
) => {
    return setDoc(doc(fireDB, "users_extend", userId), {
        roles,
        email,
        timestamp: new Date().getTime(),
        createdBy: createdBy || "self",
        username,
        location,
    });
};

export const getExtendedUser = (userId: string) => {
    return getDoc(doc(fireDB, "users_extend", userId));
};

export const getLocations = async (search: string): Promise<{ data: LocationType[] } | undefined> => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${process.env.REACT_APP_ROAD_GOAT_BASIC_AUTH}`);

    let requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            "https://api.roadgoat.com/api/v2/destinations/auto_complete?q=" + search,
            requestOptions
        );

        return response.json() as Promise<{ data: LocationType[] }>;
    } catch (error) {
        console.log("error", error);
    }
};

export const createBike = (bike: BikeType, createdBy?: User) => {
    return addDoc(BIKES_DB_REF, {
        ...bike,
        createdBy: createdBy?.email,
        timestamp: new Date().getTime(),
        lastupdate: new Date().getTime(),
    });
};

export const updateBikes = (bike: BikeType) => {
    let id = bike.id;
    delete bike.id;
    return setDoc(doc(fireDB, "bikes", id!), {
        ...bike,
        lastupdate: new Date().getTime(),
    });
};

const deleteDocument = (collectionName: string, docId: string) => {
    return deleteDoc(doc(fireDB, collectionName, docId));
};

export const deleteBikes = (bikeId: string) => deleteDocument("bikes", bikeId);

export const deleteReservation = (resaId: string) => deleteDocument("reservations", resaId);

export const deleteUserExtend = (userId: string) => deleteDocument("users_extend", userId);

export const addReservation = (bike: BikeType, startDate: string, endDate: string, by: AuthUserType) => {
    delete bike.createdBy;
    const { email, username, user } = by;
    const { color, model, id } = bike;
    const resa: ReservationType = {
        endDate: endDate,
        bikeId: id!,
        userId: user?.uid!,
        startDate: startDate,
        timestamp: new Date().getTime(),
        bike: {
            location: bike.location,
            model,
            color,
        },
        user: {
            email,
            username,
        },
    };
    return addDoc(collection(fireDB, "reservations"), resa);
};

export const saveBikeRating = (rate: RatingType) => {
    const { id } = rate;

    if (id) {
        return setDoc(doc(fireDB, "ratings", id!), {
            ...rate,
            lastupdate: new Date().getTime(),
        });
    }

    return addDoc(collection(fireDB, "ratings"), {
        ...rate,
        timestamp: new Date().getTime(),
        lastupdate: new Date().getTime(),
    });
};
