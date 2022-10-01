import React from "react";
import { render, screen } from "@testing-library/react";
import { Navbar } from "components/";
import { AuthContext } from "context/";
import { BrowserRouter } from "react-router-dom";
import { ROLES } from "utils";

test("Render navbar component with 2 li items, username and email", () => {
    let auth = {
        roles: [ROLES.Admin],
        email: "test@gmail.com",
        username: "test",
        location: "Paris",
    };
    render(
        <BrowserRouter>
            <AuthContext.Provider
                value={{
                    auth,
                }}
            >
                <Navbar />
            </AuthContext.Provider>
        </BrowserRouter>
    );

    const navbar = screen.getByTestId("navMenu");
    const navbarItems = screen.getAllByRole("listitem");
    expect(navbar).toBeInTheDocument();
    expect(navbarItems.length).toBe(2);
    expect(navbar.firstElementChild).toHaveTextContent(`${auth?.username} | ${auth?.email}`);
});
