import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";

const UnauthRouter = ({ setUser }) => {
  useEffect(() => {}, []);

  return (
    <Routes>
      <Route
        path="/"
        name="unauth"
        element={<Login setUser={setUser} />}
        exact
      />
    </Routes>
  );
};

export default UnauthRouter;
