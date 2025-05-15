import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import "./App.css";

import {
  Login,
  Register,
  Dashboard,
  Office,
  Layout,
  Site,
  Roles,
  SiteExpenses,
  UpdateSite,
  UnAuthorised,
  ChatBot,
  SiteDetailExpensesList,
  AttachmentPage,
} from "./components/index";

function App() {
  const [token, setToken] = useState(null);
  const initialValue = ["isAdd,isDelete,isUpdate"];
  const [permission]: any = useState(initialValue);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "superuser", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attachment"
          element={
            <ProtectedRoute allowedRoles={["superuser", "admin"]}>
              <AttachmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/site"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <Site />
            </ProtectedRoute>
          }
        />
        <Route
          path="/siteexpenses"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <SiteExpenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sitedetailexpenses"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <SiteDetailExpensesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sitedetails"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <UpdateSite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/office"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Office />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute allowedRoles={["user", "superuser", "admin"]}>
              <ChatBot />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorised" element={<UnAuthorised />} />
        {/* <Route path="/layout" element={<Layout />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
