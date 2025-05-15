import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AttachmentPage from "./AttachmentPage";

describe("<AttachmentPage />", () => {
  test("it should mount", () => {
    render(<AttachmentPage />);

    const attachmentPage = screen.getByTestId("AttachmentPage");

    expect(attachmentPage).toBeInTheDocument();
  });
});
