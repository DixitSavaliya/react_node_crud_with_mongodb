import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";

const PrivateRoute = (props) => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  if (token) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
