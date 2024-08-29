import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import NewRegister from "./Pages/Auth/NewRegister";
import HomeIndex from "./Pages/Home/index";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <NewRegister />,
      },
      {
        path: "/home",
        element: <HomeIndex />,
      },
    ],
  },
]);

export default Router;
