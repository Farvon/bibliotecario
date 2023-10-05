import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser } from "../backend/controllers/usuarios";

import AuthRouter from "./AuthRouter";
import UnauthRouter from "./UnauthRouter";
import Header from "../components/Header";
import Loading from "../components/Loading";

const MainRouter = () => {
  const [user, setUser] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header user={user} />
      {!loading ? (
        <BrowserRouter>
          {user ? (
            <AuthRouter
              user={user}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          ) : (
            <UnauthRouter
              setUser={setUser}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              setLoading={setLoading}
            />
          )}
        </BrowserRouter>
      ) : (
        <Loading />
      )}
      <ToastContainer />
    </>
  );
};

export default MainRouter;
