import React from "react";
import { render, screen } from "@testing-library/react";
import { SideBar } from "components/";
import { AuthContext } from "context/";
import { BrowserRouter } from "react-router-dom";
import { ROLES } from "utils";

test("Render sidebar component with 4 li items when user has Admin role", () => {
    render(
        <BrowserRouter>
            <AuthContext.Provider
                value={{
                    auth: {
                        roles: [ROLES.Admin],
                        email: "test@gmail.com",
                        username: "test",
                        location: "Paris",
                    },
                }}
            >
                <SideBar />
            </AuthContext.Provider>
        </BrowserRouter>
    );

    const menu = screen.getByTestId("menuId");
    const menuItems = screen.getAllByRole("listitem");
    expect(menu).toBeInTheDocument();
    expect(menuItems.length).toBe(4);
});

test("Render sidebar component with 2 li items when user has User role", () => {
    render(
        <BrowserRouter>
            <AuthContext.Provider
                value={{
                    auth: {
                        roles: [ROLES.User],
                        email: "test@gmail.com",
                        username: "test",
                        location: "Paris",
                    },
                }}
            >
                <SideBar />
            </AuthContext.Provider>
        </BrowserRouter>
    );

    const menu = screen.getByTestId("menuId");
    const menuItems = screen.getAllByRole("listitem");
    expect(menu).toBeInTheDocument();
    expect(menuItems.length).toBe(2);
});
