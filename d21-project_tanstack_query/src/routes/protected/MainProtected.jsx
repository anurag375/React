import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const MainProtected = () => {
  let { user } = useSelector((store) => store.auth);

  if (!user) {
    return <Navigate to={"/"} />;   // user not logged in
  }

  return <Outlet />;
};

export default MainProtected;