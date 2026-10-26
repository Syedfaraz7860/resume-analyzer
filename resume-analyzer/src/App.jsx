import { memo } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Sign from "./pages/Sign";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/Sign",
        element: <Sign />,
    },
    {
        path: "/Home",
        element: <Home />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default memo(App);