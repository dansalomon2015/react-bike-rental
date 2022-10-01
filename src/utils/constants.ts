import { collection } from "firebase/firestore";
import { fireDB } from "libs";
import { ROLE } from "./types";

export const ROLES: {
    User: ROLE;
    Admin: ROLE;
} = {
    User: "USER_ROLE",
    Admin: "ADMIN_ROLE",
};

export const PASSWORD_MIN_LENGTH = 5;

export const USER_DATA = "USER_DATA";

export const BIKES_DB_REF = collection(fireDB, "bikes");
