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
import UserShow from "../pages/dashboard/users/UserShow";
import CategoryShow from "../pages/dashboard/categories/CategoryShow";
import UserEdit from "../pages/dashboard/users/UserEdit";
import CategoryEdit from "../pages/dashboard/categories/CategoryEdit";

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

            // Settings
            { path: "site-settings", element: <AdminRoute><SiteSettings /></AdminRoute> },

            // Users
            { path: "users", element: <UserList /> },
            { path: "users/create", element: <AdminRoute><UserCreate /></AdminRoute> },
            { path: "users/:id", element: <UserShow /> },
            { path: "users/:id/edit", element: <AdminRoute><UserEdit /></AdminRoute> },

            // Categories
            { path: "categories", element: <CategoryList /> },
            { path: "categories/create", element: <AdminRoute><CategoryCreate /></AdminRoute> },
            { path: "categories/:id", element: <CategoryShow /> },
            { path: "categories/:id/edit", element: <AdminRoute><CategoryEdit /></AdminRoute> },
        ]
    },
    {
        path: "/denied-access",
        element: <div>Access Denied</div>
    }
]);
