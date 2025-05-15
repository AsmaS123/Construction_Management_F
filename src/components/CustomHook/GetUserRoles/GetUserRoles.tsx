import React, { FC, useEffect } from "react";
import styles from "./GetUserRoles.module.css";
import { useState } from "react";
// import axios from "axios";
import axiosInstance from "../../../middleware/axiosinterceptors";
import apiurl from "../../../config/url";
import { useDispatch } from "react-redux";
import { setuser, getuser } from "../../../redux/actions";

interface GetUserRolesProps {}

const GetUserRoles = (props: any) => {
  // debugger
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // debugger;
    const url = apiurl + "roles/" + props;
    axiosInstance
      .get(url)
      .then((res) => {
        setData(res.data);
        // debugger
        dispatch(setuser(res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  return { data };
};

export default GetUserRoles;
