import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser, verificarSesion } from "../backend/controllers/usuarios";

import AuthRouter from "./AuthRouter";
import UnauthRouter from "./UnauthRouter";
import Header from "../components/Header";
import Loading from "../components/Loading";

const MainRouter = () => {
  const [user, setUser] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState();
  const [showToast, setShowToast] = useState(false);

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

  const notificar = (msj, tipo) => {
    const estilos = {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    };
    tipo == "info" && toast.info(msj, estilos);
    tipo == "success" && toast.success(msj, estilos);
    tipo == "warn" && toast.warn(msj, estilos);
    tipo == "error" && toast.error(msj, estilos);
  };

  showToast && notificar();

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
              setShowToast={setShowToast}
              notificar={notificar}
            />
          ) : (
            <UnauthRouter
              setUser={setUser}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              setShowToast={setShowToast}
              notificar={notificar}
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
