import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import SingUp from "../views/SingUp";

const UnauthRouter = ({ user, setLoading }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        <Route path="/" name="login" element={<Login user={user} />} exact />
        <Route
          path="/singup"
          name="singup"
          element={<SingUp setLoading={setLoading} />}
          exact
        />
      </Routes>
    </>
  );
};

export default UnauthRouter;
