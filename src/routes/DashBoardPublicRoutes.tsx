import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { Register } from "../components/auth/Register";

export const DashBoardPublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/newUser" element={<Register />} />

        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </>
  );
};
