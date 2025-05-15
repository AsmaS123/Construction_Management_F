import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoaderContext from "./LoaderContext";

describe("<LoaderContext />", () => {
  test("it should mount", () => {
    render(<LoaderContext />);

    const loaderContext = screen.getByTestId("LoaderContext");

    expect(loaderContext).toBeInTheDocument();
  });
});
