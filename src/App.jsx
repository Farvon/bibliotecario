import { Route, Routes } from "react-router";
import { supabase } from "./backend/client";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Login from "./views/Login";
import SingUp from "./views/SingUp";
import Admin from "./views/Admin";
import Home from "./views/Home";
import Testing from "./views/Testing";

import { verificarSesion } from "./backend/controllers/usuarios";

import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [loginStatus, setLoginStatus] = useState();

  useEffect(() => {
    verificarSesion().then((data) => {
      setUser(data);
      data.session != null && setLoginStatus(true);
      setUserEmail(user.session.user.email);
      console.log(userEmail);
    });
  }, []);

  return (
    <>
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <Routes>
        <Route
          path="/"
          element={
            loginStatus ? (
              userEmail === "admin@bibliotecario.com" ? (
                <Admin />
              ) : (
                <Home setLoginStatus={setLoginStatus} />
              )
            ) : (
              <Login setUser={setUser} setLoginStatus={setLoginStatus} />
            )
          }
        />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/test" element={<Testing />} />
      </Routes>
    </>
  );
}

export default App;
