import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "../views/Admin";
import Home from "../views/Home";
import Header from "../components/Header";

const AuthRouter = (user, setLoginStatus, loginStatus) => {
  useEffect(() => {}, []);

  return (
    <>
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <Routes>
        <Route
          path="/"
          name="auth"
          element={
            <>
              {/* Si el usuario es Admin nos deriva a su respectiva página
            sino nos deriva al WelcomePage */}
              {user && user.user.email === "admin@bibliotecario.com" ? (
                <Admin />
              ) : (
                <Home />
              )}
            </>
          }
          exact
        />
      </Routes>
    </>
  );
};

export default AuthRouter;
