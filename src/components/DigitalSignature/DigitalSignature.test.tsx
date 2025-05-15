import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DigitalSignature from "./DigitalSignature";

describe("<DigitalSignature />", () => {
  test("it should mount", () => {
    render(<DigitalSignature />);

    const digitalSignature = screen.getByTestId("DigitalSignature");

    expect(digitalSignature).toBeInTheDocument();
  });
});
