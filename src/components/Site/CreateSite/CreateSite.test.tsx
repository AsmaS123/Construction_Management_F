import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateSite from "./CreateSite";

describe("<CreateSite />", () => {
  test("it should mount", () => {
    render(<CreateSite />);

    const createSite = screen.getByTestId("CreateSite");

    expect(createSite).toBeInTheDocument();
  });
});
