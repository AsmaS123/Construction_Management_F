import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GlobalLoader from "./GlobalLoader";

describe("<GlobalLoader />", () => {
  test("it should mount", () => {
    render(<GlobalLoader />);

    const globalLoader = screen.getByTestId("GlobalLoader");

    expect(globalLoader).toBeInTheDocument();
  });
});
