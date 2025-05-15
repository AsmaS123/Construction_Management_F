import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateUpdateRole from "./CreateUpdateRole";

describe("<CreateUpdateRole />", () => {
  test("it should mount", () => {
    render(<CreateUpdateRole />);

    const createUpdateRole = screen.getByTestId("CreateUpdateRole");

    expect(createUpdateRole).toBeInTheDocument();
  });
});
