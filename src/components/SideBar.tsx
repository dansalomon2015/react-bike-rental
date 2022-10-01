import React from "react";
import { MenuItem } from "./MenuItem";
import { Badge } from "./Badge";
import { useMatch } from "react-router-dom";
import { useAuth, useStore } from "hooks/";
import { isAdmin } from "utils/";

export const SideBar = () => {
    const { auth } = useAuth();
    const { bikes, reservations, userList, managerList } = useStore({});

    const IsActive = (path: string) => Boolean(useMatch(path));

    let homePath = isAdmin(auth) ? "/admin" : "/home";

    return (
        <aside className="w-64 h-screen" aria-label="Sidebar">
            <div className="overflow-y-auto h-full py-4 px-3 bg-yellow-400">
                <span className="flex items-center pl-2.5 mb-5 self-center text-xl font-semibold whitespace-nowrap ">
                    Biker Rentals
                </span>

                <ul className="space-y-2" data-testid="menuId">
                    <li>
                        <MenuItem
                            to={homePath}
                            title="Bikes List"
                            active={IsActive(homePath)}
                            content={<Badge count={bikes.length} />}
                        />
                    </li>

                    {!isAdmin(auth) && (
                        <li>
                            <MenuItem
                                to="/resa"
                                title="Reservations"
                                active={IsActive("/resa")}
                                content={<Badge count={reservations.length} />}
                            />
                        </li>
                    )}

                    {isAdmin(auth) && (
                        <li>
                            <MenuItem
                                to="/reservations"
                                title="Reservations"
                                active={IsActive("/resa")}
                                content={<Badge count={reservations.length} />}
                            />
                        </li>
                    )}

                    {isAdmin(auth) && (
                        <li>
                            <MenuItem
                                to="/users"
                                title="Users"
                                active={IsActive("/users")}
                                content={<Badge count={userList.length} />}
                            />
                        </li>
                    )}
                    {isAdmin(auth) && (
                        <li>
                            <MenuItem
                                to="/managers"
                                title="Managers"
                                active={IsActive("/managers")}
                                content={<Badge count={managerList.length} />}
                            />
                        </li>
                    )}
                </ul>
            </div>
        </aside>
    );
};
