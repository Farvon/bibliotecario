import { Route, Routes } from "react-router";
import { supabase } from "./backend/client";
import "./App.css";

import Login from "./views/Login";
import SingUp from "./views/SingUp";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import { verificarSesion } from "./backend/controllers/usuarios";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    verificarSesion().then((data) => {
      setUser(data), console.log(data);
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={user.session != null ? <Home /> : <Login setUser={setUser} />}
      />
      <Route path="/singup" element={<SingUp />} />

      {/* <Route path="/home" element={<Home />} /> */}
    </Routes>
  );
}

export default App;
