import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";

const PrivateRoute = (props) => {
  const token = true;

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
