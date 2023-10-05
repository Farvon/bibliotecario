import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "../views/Admin";
import Home from "../views/Home";
import PerfilUser from "../views/PerfilUser";

const AuthRouter = ({ user }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          name="auth"
          element={
            <>
              {user && user.email === "admin@bibliotecario.com" ? (
                <Admin admin={true} />
              ) : (
                <Home admin={false} user={user} />
              )}
            </>
          }
          exact
        />
        <Route
          path="/perfil"
          name="perfil"
          element={<PerfilUser user={user} />}
          exact
        />
      </Routes>
    </>
  );
};

export default AuthRouter;
