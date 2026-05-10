import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/frontend/Home";
import About from "../pages/frontend/About";
import Contact from "../pages/frontend/Contact";
import Login from "../pages/frontend/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import SiteSettings from "../pages/dashboard/admin/SiteSettings";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import CategoryList from "../pages/dashboard/categories/CategoryList";
import CategoryCreate from "../pages/dashboard/categories/CategoryCreate";
import UserList from "../pages/dashboard/users/UserList";
import UserCreate from "../pages/dashboard/users/UserCreate";

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
            { path: "users", element: <UserList /> },
            { path: "users/create", element: <UserCreate /> },
            { path: "settings", element: <AdminRoute><SiteSettings /></AdminRoute> },
            { path: "categories", element: <CategoryList /> },
            { path: "categories/create", element: <CategoryCreate /> },
        ]
    },
    {
        path: "/denied-access",
        element: <div>Access Denied</div>
    }
]);
