import React from "react";
import "./App.css";
import MainRouter from "./routers/MainRouter";

const App = () => {
  return <MainRouter />;
};

export default App;

// import { Route, Routes } from "react-router";
// import { supabase } from "./backend/client";
// import { useEffect, useState } from "react";

// import Header from "./components/Header";
// import Login from "./views/Login";
// import SingUp from "./views/SingUp";
// import Admin from "./views/Admin";
// import Home from "./views/Home";
// import Testing from "./views/Testing";

// import { verificarSesion, getUser } from "./backend/controllers/usuarios";

// import "./App.css";

// function App() {
//   const [user, setUser] = useState([]);
//   const [userEmail, setUserEmail] = useState();
//   const [loginStatus, setLoginStatus] = useState();
//   const [loading, setLoading] = useState();

//   useEffect(() => {
//     setLoading(false);
//     getUser().then((data) => {
//       setUser(data);
//       console.log(data);
//       // data.session && setLoginStatus(true);
//       // setUserEmail(data?.session?.user?.email);
//       // setLoading(false);
//       // console.log(data?.session?.user?.email);
//     });
//   }, []);

//   return (
//     <>
//       {!loading ? (
//         <>
//           <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 loginStatus ? (
//                   userEmail == "admin@bibliotecario.com" ? (
//                     <Admin />
//                   ) : (
//                     <Home setLoginStatus={setLoginStatus} />
//                   )
//                 ) : (
//                   <Login setUser={setUser} setLoginStatus={setLoginStatus} />
//                 )
//               }
//             />
//             <Route path="/singup" element={<SingUp />} />
//             <Route path="/test" element={<Testing />} />
//           </Routes>
//         </>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </>
//   );
// }

// export default App;
