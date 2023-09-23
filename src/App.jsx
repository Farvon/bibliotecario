import { Route, Routes } from "react-router";
import { supabase } from "./backend/client";
import "./App.css";

import Login from "./views/Login";
import SingUp from "./views/SingUp";
import Admin from "./views/Admin";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import { verificarSesion } from "./backend/controllers/usuarios";

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

      {/* <Route path="/home" element={<Home />} /> */}
    </Routes>
  );
}

export default App;
