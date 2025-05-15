import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SiteInvoiceReport from "./SiteInvoiceReport";

describe("<SiteInvoiceReport />", () => {
  test("it should mount", () => {
    render(<SiteInvoiceReport />);

    const siteInvoiceReport = screen.getByTestId("SiteInvoiceReport");

    expect(siteInvoiceReport).toBeInTheDocument();
  });
});
