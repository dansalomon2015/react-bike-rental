import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "context";
import { BrowserRouter } from "react-router-dom";

test("renders App", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    );
});
