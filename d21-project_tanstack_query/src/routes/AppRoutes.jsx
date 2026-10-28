import { createBrowserRouter, RouterProvider } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from "react-toastify";
import { addUser } from '../features/authSlice'

// import HomePage from '../pages/HomePage'
// import LoginPage from '../pages/LoginPage'
// import RegisterPage from '../pages/RegisterPage'

// import PublicProtected from '../routes/protected/PublicProtected'
// import MainProtected from '../routes/protected/MainProtected'
// import AuthLayout from '../layouts/AuthLayout'
// import MainLayout from '../layouts/MainLayout'

// import ShopPage from '../pages/ShopPage'
// import AboutPage from '../pages/AboutPage'

import { lazy } from "react";

// Layouts
const AuthLayout = lazy(() => import("../layout/AuthLayout"));
const MainLayout = lazy(() => import("../layout/MainLayout"));

// Pages
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));

const PublicProtected = lazy(() => import("./protected/PublicProtected"));

const MainProtected = lazy(() => import("./protected/MainProtected"));


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
                        {
                            path: "shop",
                            element: <ShopPage />
                        },
                        {
                            path: "about",
                            element: <AboutPage />
                        }
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />
}

export default AppRoutes
