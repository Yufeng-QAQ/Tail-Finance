// import App from "../App";
import NotFound from "../layout/NotFound";
import Layout from "../layout/Layout";
import Home from "../layout/Home";
import Budget from "../layout/Budget";
import Login from "../layout/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "./authRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout></Layout></AuthRoute>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "Budget",
                element:<Budget></Budget>
            }
        ]
    },
    {
        path: '/Login',
        element: <Login></Login>
    },
    {
        path: "*",
        element: <NotFound />
    }
])


export default router