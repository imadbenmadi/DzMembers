import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import Home from "./components/home.jsx";
import AuthIndex from "./components/AuthComponents/AuthIndex.jsx";
import Sign_up from "./components/AuthComponents/Sign_up.jsx";
import Login from "./components/AuthComponents/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        
    },
    {
        index: true,
        element: <Home />,
    },
    {
        path: "/Auth",
        element: <Auth />,
        children: [
            { index: true, element: <AuthIndex /> },
            { path: "/Auth/Sign_up", element: <Sign_up /> },
            { path: "/Auth/Login", element: <Login /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
