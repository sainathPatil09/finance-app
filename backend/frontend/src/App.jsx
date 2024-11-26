import toast, { Toaster } from "react-hot-toast";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./homePage/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";

export default function App() {
  const { authUser } = useAuth();
  console.log(authUser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </>
  );
}
