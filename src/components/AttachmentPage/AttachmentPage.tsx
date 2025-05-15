import React, { FC } from "react";
import styles from "./AttachmentPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../middleware/axiosinterceptors";
import { useSearchParams } from "react-router-dom";
import apiurl from "../../config/url";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
// import Textarea from '@mui/joy/Textarea';
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import DigitalSignature from "../DigitalSignature/DigitalSignature";
import { styled } from "@mui/material/styles";
import html2pdf from "html2pdf.js";
import { toast, ToastContainer } from "react-toastify";

interface AttachmentPageProps {}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AttachmentPage = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [fileUrl, setFileUrl]: any = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    debugger;
    // displayImage();
  }, []);

  function removeFileExtension(filename: string) {
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
  }

  const handleDownload = () => {
    const input: any = document.getElementById("invoice");
    const options: any = {
      margin: 1,
      filename: removeFileExtension(props.filname),
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    (html2pdf().from(input).set(options) as any).save();
  };

  const displayImage = () => {
    debugger;
    setOpen(true);
    const siteId: any = searchParams.get("siteId");
    const _id: any = props._id;
    const key: any = searchParams.get("key");

    if (key == "client") {
      const url =
        apiurl + "siteexpenses/attachment/" + siteId + "/" + key + "/" + _id;
      fetch(url, { credentials: "include" })
        .then((res) => res.json())
        .then(async (data: any) => {
          debugger;
          // console.log(data, "data");
          const tempStr = "data:" + data.contentType + ";base64," + data.data;
          setFileUrl(tempStr);
          setOpen(true);
          // toast.success()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <main>
        <ToastContainer
          position="top-center"
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
        <a
          onClick={() => displayImage()}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {props.filname}
        </a>
        <BootstrapDialog
          fullWidth
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Attachment
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
          <DialogContent dividers id="invoice">
            {/* return (<> */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} md={6}>
                filname: {props.filname}
                {fileUrl && (
                  <img
                    src={fileUrl}
                    alt="Attachment"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDownload}>
              Download
            </Button>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </main>
    </>
  );
};

export default AttachmentPage;
