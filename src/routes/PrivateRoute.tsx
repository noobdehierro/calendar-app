import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../redux/reducer/rootReducer";

export const PrivateRoute = ({ children }: any) => {
  const { uid } = useSelector((state: State) => state.auth);

  return uid ? { ...children } : <Navigate to={"/login"} />;
};
