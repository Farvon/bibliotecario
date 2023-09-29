import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "../views/Admin";
import Home from "../views/Home";
import Loading from "../components/Loading";

const AuthRouter = ({ user, setShowToast, notificar }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <Routes>
          <Route
            path="/"
            name="auth"
            element={
              <>
                {user && user.email === "admin@bibliotecario.com" ? (
                  <Admin />
                ) : (
                  <Home notificar={notificar} />
                )}
              </>
            }
            exact
          />
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AuthRouter;
