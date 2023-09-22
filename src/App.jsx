import { Route, Routes } from "react-router";
import { supabase } from "./backend/client";
import "./App.css";

import Login from "./views/Login";
import SingUp from "./views/SingUp";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import { getUser, verificarSesion } from "./backend/controllers/usuarios";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    verificarSesion().then((data) => {
      setUser(data), console.log(data);
    });

    getUser().then((data) => {
      console.log(data), setUser(data);
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={user != null ? <Home /> : <Login setUser={setUser} />}
      />
      <Route path="/singup" element={<SingUp />} />

      {/* <Route path="/home" element={<Home />} /> */}
    </Routes>
  );
}

export default App;
