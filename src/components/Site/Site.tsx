import styles from "./Site.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Layout from "../Layout/Layout";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import SiteList from "./SiteList/SiteList";
import CreateSite from "./CreateSite/CreateSite";

interface SiteProps {}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Site = () => {
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  // const [edit, setEdit] = useState(false);

  const handleVisibility = (status: any) => {
    console.log("testing here....");
    setVisible(status);
  };

  // const handleEdit = (key: any) => {
  //   setEdit(key);
  // };

  // if (!data) return <div>Loading...</div>;

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <Layout />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            {!visible && <SiteList updateVisibility={handleVisibility} />}
            {visible && <CreateSite updateVisibility={handleVisibility} />}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Site;
