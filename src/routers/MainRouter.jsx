import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getUser, verificarSesion } from "../backend/controllers/usuarios";

import AuthRouter from "./AuthRouter";
import UnauthRouter from "./UnauthRouter";

const MainRouter = () => {
  const [user, setUser] = useState();
  const [loginStatus, setLoginStatus] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    getUser().then((data) => {
      setUser(data);
      setLoading(false);
    });

    verificarSesion().then((data) => {
      data.session != null && setLoginStatus(true);
      console.log(loginStatus);
    });

    // const loggedUserJSON = localStorage.getItem('loggedRegMedUser');
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON);
    //   setUser(user);
    // }
  }, []);

  return (
    <>
      <BrowserRouter>
        {user ? (
          <AuthRouter
            user={user}
            loginStatus={loginStatus}
            setLoginStatus={setLoginStatus}
          />
        ) : (
          <UnauthRouter setUser={setUser} setLoginStatus={setLoginStatus} />
        )}
      </BrowserRouter>
    </>
  );
};

export default MainRouter;
