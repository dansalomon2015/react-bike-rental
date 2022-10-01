import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "components/";

test("Render component with count text", () => {
    render(<Badge count={5} />);

    const badge = screen.getByText("5");
    expect(badge).toBeInTheDocument();
});
