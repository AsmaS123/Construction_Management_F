import React, { FC, useEffect } from "react";
import html2pdf from "html2pdf.js";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ToastContainer, toast } from "react-toastify";
import "../../../../../node_modules/react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

interface SiteDetailInvoiceReportProps {}

const SiteDetailInvoiceReport = (props: any) => {
  const [total, setTotal] = useState({
    totalAmount: 0,
    creditTotal: 0,
    debitTotal: 0,
  });
  const [invoiceDetails, setInvoiceDetails] = useState<any>({});

  const downloadInvoice = () => {
    const input: any = document.getElementById("invoice");
    const options: any = {
      margin: 1,
      filename: "generated-file.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    (html2pdf().from(input).set(options) as any).save();
  };

  const calculateTotal = (data: any) => {
    // debugger
    let creditTotal = 0;
    let debitTotal = 0;
    let totalAmount = 0;
    //calculate credit total
    debugger;
    if (data && data.site.client_expenses_status == "credited") {
      data.expenses.map((elm: any) => {
        if (elm.amount && typeof elm.amount == "string") {
          creditTotal += parseInt(elm.amount);
        } else {
          creditTotal += elm.amount;
        }
      });
    }
    totalAmount = creditTotal;
    setTotal({ ...total, creditTotal, totalAmount, debitTotal });
  };

  useEffect(() => {
    if (props.invoiceData) {
      setInvoiceDetails(props.invoiceData);
      calculateTotal(props.invoiceData);
    }
  }, []);

  return (
    <>
      {
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/site">
                    Site
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => props.updateVisibility(false)}
                  >
                    Site Expenses
                  </Link>
                  <Typography color="text.primary">
                    Report - <a onClick={downloadInvoice}>download</a>
                  </Typography>
                </Breadcrumbs>
              </div>
              <div id="invoice">
                <Paper sx={{ display: "flex", flexDirection: "column" }}>
                  <header
                    style={{
                      backgroundColor: "#b8ddcb",
                      margin: "0px",
                      padding: "5px 5px 5px 5px",
                      height: "100px",
                      borderBottom: "5px solid gray",
                    }}
                  >
                    <div style={{ padding: "1% " }}>
                      <p style={{ fontSize: "12px" }}>
                        Dream House Constrction, <br />
                        Latur Plaza, <br />
                        contact no : 1234567890{" "}
                      </p>
                      <p style={{ float: "right", marginTop: "-7%" }}>
                        <img src="/logo.jpg" alt="Example" width="70" />
                      </p>{" "}
                    </div>
                  </header>
                </Paper>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <h3>{props.invoiceData.site_name} Site Invoice</h3>

                  {/* <p><b> Site ID</b> : {props.invoiceData.site_id} ,&nbsp; &nbsp;&nbsp; &nbsp;<b> Site Type </b>: {props.data.site_type}, &nbsp; &nbsp; &nbsp; &nbsp;<b> Site Name </b>: {props.data.site_name}, &nbsp; &nbsp;&nbsp; &nbsp;<b> Site Engineer Name </b> : {props.data.site_engineer_name},
                  &nbsp; &nbsp;&nbsp; &nbsp; <b>Client Name </b> : {props.data.client_name}
                  </p> */}

                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead
                      style={{ backgroundColor: "gray", color: "white" }}
                    >
                      <TableRow>
                        <TableCell>s.no</TableCell>
                        <TableCell>Payment Mode</TableCell>
                        <TableCell>Amout</TableCell>
                        <TableCell>client_expenses_status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Engineer Signature</TableCell>
                        <TableCell> Client Signature</TableCell>
                        <TableCell>Attachment</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.invoiceData &&
                        props.invoiceData.expenses &&
                        props.invoiceData.expenses.map(
                          (elm: any, index: any) => {
                            const sno = index + 2;
                            return (
                              <>
                                <TableRow>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{elm.payment_mode}</TableCell>
                                  <TableCell>{elm.amount}</TableCell>
                                  <TableCell>
                                    {Object.keys(props.invoiceData).length >
                                      0 &&
                                      props.invoiceData.site
                                        .client_expenses_status}
                                  </TableCell>
                                  <TableCell>{elm.date}</TableCell>
                                  <TableCell>
                                    <img
                                      src={elm.engineer_signature}
                                      alt="Preview"
                                      style={{ width: "150px" }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <img
                                      src={elm.client_signature}
                                      alt="Preview"
                                      style={{ width: "300px" }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {elm.attachment && elm.attachment.name}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          },
                        )}
                    </TableBody>
                  </Table>
                  <hr></hr>
                  <p>
                    <b> Total </b> : {total && total.totalAmount} ,&nbsp; &nbsp;
                    &nbsp; &nbsp;
                    <b> Total Credited </b> : {total && total.creditTotal}{" "}
                    ,&nbsp; &nbsp; &nbsp; &nbsp; <b> Total Debited </b>:{" "}
                    {total && total.debitTotal}
                  </p>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Container>
      }
    </>
  );
};

export default SiteDetailInvoiceReport;
