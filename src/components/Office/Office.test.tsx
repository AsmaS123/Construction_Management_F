import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Office from "./Office";

describe("<Office />", () => {
  test("it should mount", () => {
    render(<Office />);

    const office = screen.getByTestId("Office");

    expect(office).toBeInTheDocument();
  });
});
