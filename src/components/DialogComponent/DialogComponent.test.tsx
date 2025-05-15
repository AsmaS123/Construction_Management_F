import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DialogComponent from "./DialogComponent";

describe("<DialogComponent />", () => {
  test("it should mount", () => {
    render(<DialogComponent />);

    const dialogComponent = screen.getByTestId("DialogComponent");

    expect(dialogComponent).toBeInTheDocument();
  });
});
