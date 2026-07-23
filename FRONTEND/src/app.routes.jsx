import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";
import Protected from "./features/auth/component/Protected";
import FaceExpression from "./features/expression/component/FaceExpression";
import Layout from "./features/shared/component/Layout";
import ConfirmLogout from "./features/shared/component/ConfirmLogout";

export const appRoutes = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Protected><FaceExpression /></Protected> },
            { path: "/logout", element: <Protected><ConfirmLogout /></Protected> }
        ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
]);