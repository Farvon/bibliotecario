import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getUser, verificarSesion } from "../backend/controllers/usuarios";

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
    getUser().then((data) => {
      setUser(data);
      setLoading(false);
    });

    verificarSesion().then((data) => {
      data.session != null && setLoginStatus(true);
    });

    // const loggedUserJSON = localStorage.getItem('loggedRegMedUser');
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON);
    //   setUser(user);
    // }
  }, []);

  return (
    <>
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
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
            />
          )}
        </BrowserRouter>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MainRouter;
