import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "../views/Admin";
import Home from "../views/Home";
import PerfilUser from "../views/PerfilUser";

const AuthRouter = ({ user, setShowToast, notificar }) => {
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
                <Home admin={false} user={user} notificar={notificar} />
              )}
            </>
          }
          exact
        />
        <Route
          path="/perfil"
          name="perfil"
          element={<PerfilUser user={user} notificar={notificar} />}
          exact
        />
      </Routes>
    </>
  );
};

export default AuthRouter;
