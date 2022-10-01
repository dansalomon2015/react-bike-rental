import React from "react";
import { render, screen } from "@testing-library/react";
import { Alert } from "components/";

test("Render Alert component with class `bg-red-500` when message is not empty and type not specified", () => {
    render(<Alert message="message" />);

    const errorMsg = screen.getByTestId("errorId");
    expect(errorMsg).toHaveClass("bg-red-500");
    expect(errorMsg).toBeInTheDocument();
});

test("Render Alert component when message is empty", () => {
    const { container } = render(<Alert message="" />);
    expect(container.firstChild).toBeNull();
});

test("Render Alert component when message is not defined", () => {
    const { container } = render(<Alert />);
    expect(container.firstChild).toBeNull();
});

test("Render Alert component with class `bg-green-500` when message is not empty and type is `success`", () => {
    render(<Alert message="message" type="success" />);

    const errorMsg = screen.getByTestId("errorId");
    expect(errorMsg).toHaveClass("bg-green-500");
    expect(errorMsg).toBeInTheDocument();
});

test("Render Alert component with class `bg-orange-500` when message is not empty and type is `warning`", () => {
    render(<Alert message="message" type="warning" />);

    const errorMsg = screen.getByTestId("errorId");
    expect(errorMsg).toHaveClass("bg-orange-500");
    expect(errorMsg).toBeInTheDocument();
});
