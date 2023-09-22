import { Route, Routes } from "react-router";
import "./App.css";

import Login from "./views/Login";
import SingUp from "./views/SingUp";
import Home from "./views/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/singup" element={<SingUp />} />

      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
