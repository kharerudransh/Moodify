import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";
import Protected from "./features/auth/component/Protected";
import FaceExpression from "./features/expression/component/FaceExpression";
import Layout from "./features/shared/component/Layout";
import ConfirmLogout from "./features/shared/component/ConfirmLogout";
import Home from "./features/home/pages/Home";
import Upload from "../src/features/home/pages/Upload";

export const appRoutes = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Protected><Home /></Protected> },
            { path: "/logout", element: <Protected><ConfirmLogout /></Protected> },
            { path: "/home", element: <Protected><Home /></Protected> },  
            { path: "/upload", element: <Protected><Upload /></Protected> },
        ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
]);