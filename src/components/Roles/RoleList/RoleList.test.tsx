import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RoleList from "./RoleList";

describe("<RoleList />", () => {
  test("it should mount", () => {
    render(<RoleList />);

    const roleList = screen.getByTestId("RoleList");

    expect(roleList).toBeInTheDocument();
  });
});
