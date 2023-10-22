import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import SingUp from "../views/SingUp";
import Recover from "../views/Recover";
import UpdatePassword from "../views/UpdatePassword";

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
        <Route path="/recover" name="recover" element={<Recover />} exact />
        <Route
          path="/updatepassword"
          name="updatePassword"
          element={<UpdatePassword />}
          exact
        />
      </Routes>
    </>
  );
};

export default UnauthRouter;
