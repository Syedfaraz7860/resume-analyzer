import { memo } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";

import Home from "./pages/Home";
import Sign from "./pages/Sign";
import Login from "./pages/Login";

const router = createBrowserRouter([

  //Home
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Sign",
    element: <Sign />,
  },
  {
    path: "/Login",
    element: <Login />,
  }

]);

const App = () => {
return <RouterProvider router={router} />;
};

export default memo(App);