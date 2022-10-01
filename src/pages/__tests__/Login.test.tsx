import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "context/";
import { Login } from "pages/";
import { BrowserRouter } from "react-router-dom";

test("renders email input", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </BrowserRouter>
    );

    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    expect(emailInputEl).toBeInTheDocument();
});

test("renders password input", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </BrowserRouter>
    );
    const passwordInputEl = screen.getByPlaceholderText("Password");
    expect(passwordInputEl).toBeInTheDocument();
});

test("renders button form", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </BrowserRouter>
    );
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
});

test("renders not visible error", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </BrowserRouter>
    );
    const errorMsg = screen.getByTestId("errorMessageId");
    expect(errorMsg.innerHTML).toBe("");
});

test("renders message email error", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </BrowserRouter>
    );

    const testEmail = "testemail";
    const passwordTest = "12345";

    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    const passwordInputEl = screen.getByPlaceholderText("Password");

    const errorMsg = screen.getByTestId("errorMessageId");

    const buttonEl = screen.getByRole("button");

    fireEvent.change(emailInputEl, { target: { value: testEmail } });
    fireEvent.change(passwordInputEl, { target: { value: passwordTest } });
    fireEvent.click(buttonEl);

    expect(errorMsg.textContent).toBe("Invalid email adress !");
});

test("renders password length error", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </BrowserRouter>
    );

    const testEmail = "testemail@gmail.com";
    const passwordTest = "1234";

    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    const passwordInputEl = screen.getByPlaceholderText("Password");

    const errorMsg = screen.getByTestId("errorMessageId");

    const buttonEl = screen.getByRole("button");

    fireEvent.change(emailInputEl, { target: { value: testEmail } });
    fireEvent.change(passwordInputEl, { target: { value: passwordTest } });
    fireEvent.click(buttonEl);

    expect(errorMsg.textContent).toBe("Password too short !");
});
