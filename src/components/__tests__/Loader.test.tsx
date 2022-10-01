import React from "react";
import { render } from "@testing-library/react";
import { Loader } from "components/";

test("Render component when loading is true", () => {
    const { container } = render(<Loader loading={true} />);
    expect(container.firstChild).not.toBeNull();
});

test("Not render component when loading is false", () => {
    const { container } = render(<Loader loading={false} />);
    expect(container.firstChild).toBeNull();
});
