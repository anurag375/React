import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import { useDispatch } from 'react-redux'

import PublicProtected from '../routes/protected/PublicProtected'
import MainProtected from '../routes/protected/MainProtected'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import { useEffect } from 'react'
import { toast } from "react-toastify";
import { addUser } from '../features/authSlice'

const AppRoutes = () => {

    let dispatch = useDispatch();

    const hydrateUser = () => {
        console.log("hydration processed...");
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser) {
        toast.error("unAuthorized user");
        return;
        }

        dispatch(addUser(loggedInUser));
    };
    useEffect(() => {
        hydrateUser();
    }, []);

    let router = createBrowserRouter([
        // 1>
        // {
        //     path: '/',
        //     // element: <HomePage />
        // },
        // {
        //     path: '/login',
        //     element: <LoginPage />
        // },
        // {
        //     path: '/register',
        //     element: <RegisterPage />
        // },


        // 2>
        {
            path: "/",
            element: <PublicProtected />,
            children: [
                {
                    path: "",
                    element: <AuthLayout />,
                    children: [
                        {
                            path: "",
                            element: <LoginPage />,
                        },
                        {
                            path: "register",
                            element: <RegisterPage />,
                        },
                    ],
                },
            ],
        },
        {
            path: "/main",
            element: <MainProtected />,
            children: [
                {
                    path: "",
                    element: <MainLayout />,
                    children: [
                        {
                            path: "",
                            element: <HomePage />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />
}

export default AppRoutes
