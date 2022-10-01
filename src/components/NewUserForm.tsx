import React, { useEffect, useState } from "react";
import { LocationInput } from "./LocationInput";
import { useAuth } from "hooks/";
import { AuthUserType, isAdmin, isEmail, PASSWORD_MIN_LENGTH, ROLE } from "utils/";
import { Loader } from "./Loader";
import { saveUser } from "api";

interface Props {
    cancelError: () => void;
    buttonTitle: string;
    setComplete: (status: boolean, email: string) => void;
    setError: (value: string) => void;
    roles: ROLE[];
    user?: AuthUserType;
}

export const NewUserForm: React.FC<Props> = ({ cancelError, buttonTitle, setComplete, setError, roles, user }) => {
    const { createUser, auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (user) {
            const { email, username, location } = user;
            setEmail(email);
            setUsername(username);
            setLocation(location);
        }
    }, [user]);

    const _register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!isEmail(email)) return setError("Invalid email adress !");

        // IF there is a user, password should not have to be checked
        if (!user) {
            if (password.trim().length < PASSWORD_MIN_LENGTH) return setError("Password too short !");
            if (!(password === confirmPassword)) return setError("Passwords do not match!");
        }
        if (!location) return setError("Please Select a location!");

        setLoading(true);

        // IF there is a user, it's an update
        if (user) {
            const { id, roles, createdBy } = user;

            saveUser(username, email, id!, roles, location, createdBy)
                .then(() => setComplete(true, email))
                .catch((e) => setError(e))
                .finally(() => {
                    setLoading(false);
                });

            return;
        }

        // @ts-ignore
        createUser(email, password, username, roles, location, isAdmin(auth) ? auth?.username : "self")
            .then((response) => {
                setError("");
                if (response) {
                    setComplete(response.complete, email);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form className="mt-6" onSubmit={_register}>
            <div className="mb-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                    Name
                </label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    onFocus={cancelError}
                    name="username"
                    placeholder="Your name"
                    disabled={loading}
                    value={username}
                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            {!user && (
                <>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onFocus={cancelError}
                            name="email"
                            placeholder="Email"
                            disabled={loading}
                            value={email}
                            className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={cancelError}
                            name="password"
                            placeholder="Password"
                            disabled={loading}
                            className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <p className="mt-1 text-right text-xs font-light  text-gray-700">Min. length : 5</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            onFocus={cancelError}
                            name="confirmPassword"
                            disabled={loading}
                            placeholder="Confirm password"
                            className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                </>
            )}

            <div className="mb-2">
                <LocationInput value={location} setLocation={setLocation} disabled={loading} />
            </div>

            <Loader loading={loading} />

            <div className="mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full disabled:bg-gray-500 disabled:cursor-not-allowed px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                    {buttonTitle}
                </button>
            </div>
        </form>
    );
};
