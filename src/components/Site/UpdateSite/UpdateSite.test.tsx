import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UpdateSite from "./UpdateSite";

describe("<UpdateSite />", () => {
  test("it should mount", () => {
    render(<UpdateSite />);

    const updateSite = screen.getByTestId("UpdateSite");

    expect(updateSite).toBeInTheDocument();
  });
});
