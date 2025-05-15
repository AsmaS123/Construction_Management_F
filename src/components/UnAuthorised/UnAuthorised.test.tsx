import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UnAuthorised from "./UnAuthorised";

describe("<UnAuthorised />", () => {
  test("it should mount", () => {
    render(<UnAuthorised />);

    const unAuthorised = screen.getByTestId("UnAuthorised");

    expect(unAuthorised).toBeInTheDocument();
  });
});
