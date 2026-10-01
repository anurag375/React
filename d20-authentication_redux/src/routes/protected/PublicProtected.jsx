import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicProtected = () => {
  let { user } = useSelector((store) => store.auth);
  console.log(user);

  if (user) {
    return <Navigate to={"/main"} />;   // user already logged in
  }

  return <Outlet />;
};

export default PublicProtected;