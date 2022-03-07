import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { startChecking } from "../redux/actions/auth";
import { State } from "../redux/reducer/rootReducer";
import { DashBoardPublicRoutes } from "./DashBoardPublicRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state: State) => state.auth);

  useEffect(() => {
        
    dispatch( startChecking() );

}, [dispatch])

if ( checking ) {
    return (<h5>Espere...</h5>);
}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login/*"
            element={
              <PublicRoutes>
                <DashBoardPublicRoutes />
              </PublicRoutes>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <CalendarScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
