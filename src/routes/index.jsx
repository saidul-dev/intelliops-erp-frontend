import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/frontend/Home";
import About from "../pages/frontend/About";
import Contact from "../pages/frontend/Contact";
import Login from "../pages/frontend/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import Users from "../pages/dashboard/Users";
import SiteSettings from "../pages/dashboard/admin/SiteSettings";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Categories from "../pages/dashboard/Categories";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
        ]
    },
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "users", element: <Users /> },
            { path: "settings", element: <AdminRoute><SiteSettings /></AdminRoute> },
            { path: "categories", element: <Categories /> },
        ]
    },
    {
        path: "/denied-access",
        element: <div>Access Denied</div>
    }
]);
