import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import SingUp from "../views/SingUp";
import Header from "../components/Header";

const UnauthRouter = (
  { setUser, setLoginStatus, setShowToast, notificar },
  loginStatus
) => {
  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          name="login"
          element={<Login setUser={setUser} />}
          exact
        />
        <Route
          path="/singup"
          name="singup"
          element={<SingUp setShowToast={setShowToast} notificar={notificar} />}
          exact
        />
      </Routes>
    </>
  );
};

export default UnauthRouter;
