import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "../views/Admin";
import Home from "../views/Home";
import PerfilUser from "../views/PerfilUser";
import Reglamento from "../views/Reglamento";
import UserManual from "../views/UserManual";
import UpdatePassword from "../views/UpdatePassword";
import Documentacion from "../views/Documentacion";

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
          element={
            <>
              {user && user.email === "admin@bibliotecario.com" ? (
                <Admin admin={true} />
              ) : (
                <PerfilUser user={user} />
              )}
            </>
          }
          exact
        />
        <Route
          path="/reglamento"
          name="reglamento"
          element={<Reglamento />}
          exact
        />

        <Route path="/manual" name="manual" element={<UserManual />} exact />

        <Route
          path="/documentacion"
          name="documentacion"
          element={<Documentacion />}
          exact
        />

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

export default AuthRouter;
