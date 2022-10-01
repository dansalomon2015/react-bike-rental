import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuItem } from "components/";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "context";
import { ROLES } from "utils";

test("Render inactive menu component with title", () => {
    const route = "/register";
    const title = "test";
    render(
        <BrowserRouter>
            <MenuItem title={title} to={route} />
        </BrowserRouter>
    );

    const menuItem = screen.getByTestId("menuItem");
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveTextContent(title);
    expect(menuItem).toHaveClass("hover:bg-yellow-600");
    expect(menuItem).not.toHaveClass("bg-gray-100");
});

test("Render active menu component with title", () => {
    const route = "/register";
    const title = "test";
    render(
        <BrowserRouter>
            <MenuItem title={title} to={route} active />
        </BrowserRouter>
    );

    const menuItem = screen.getByTestId("menuItem");
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveTextContent(title);
    expect(menuItem).not.toHaveClass("hover:bg-yellow-600");
    expect(menuItem).toHaveClass("bg-gray-100");
});

test("Render menu component with children", () => {
    const route = "/register";
    const title = "test";
    render(
        <BrowserRouter>
            <MenuItem title={title} to={route} active content={<div data-testid="childId">test</div>} />
        </BrowserRouter>
    );

    const childId = screen.getByTestId("childId");
    expect(childId).toBeInTheDocument();
});
