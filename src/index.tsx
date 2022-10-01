import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
    Login,
    ManagerHome,
    Register,
    UserHome,
    Reservation,
    Users,
    Managers,
    BikeReservations,
    UserReservations,
} from "pages/";
import { RequireAuth } from "components/";
import { ROLES } from "utils/";
import { AuthProvider } from "context";

// import LogRocket from "logrocket";
// LogRocket.init("z6i2k5/biker-rentals");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
                        <Route path="/" element={<App />}>
                            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                                <Route path="/home" element={<UserHome />} />
                                <Route path="/resa" element={<Reservation />} />
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                                <Route path="/admin" element={<ManagerHome />}>
                                    <Route path="bike/:bikeId" element={<BikeReservations />} />
                                </Route>
                                <Route path="/users" element={<Users />}>
                                    <Route path=":userId" element={<UserReservations />} />
                                </Route>
                                <Route path="/managers" element={<Managers />} />
                                <Route path="/reservations" element={<Reservation />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem", marginTop: "100px" }}>
                                <p>There's nothing here!</p>
                                <Link to={"/login"}> Home </Link>
                            </main>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
