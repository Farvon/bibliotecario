import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import SingUp from "../views/SingUp";
import Header from "../components/Header";

const UnauthRouter = ({ user, setShowToast, notificar, setLoading }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        <Route path="/" name="login" element={<Login user={user} />} exact />
        <Route
          path="/singup"
          name="singup"
          element={
            <SingUp
              setShowToast={setShowToast}
              notificar={notificar}
              setLoading={setLoading}
            />
          }
          exact
        />
      </Routes>
    </>
  );
};

export default UnauthRouter;
