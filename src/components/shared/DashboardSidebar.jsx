import React from 'react';
import { Link, useLocation } from 'react-router';
import { UserRole } from '../../constants';

const DashboardSidebar = () => {

    const location = useLocation();

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path d="M3 13h8V3H3v10Z"></path>
                    <path d="M13 21h8v-6h-8v6Z"></path>
                    <path d="M13 3v8h8V3h-8Z"></path>
                    <path d="M3 21h8v-4H3v4Z"></path>
                </svg>
            )
        },
        {
            name: "Users",
            path: "/dashboard/users",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <path d="M20 8v6"></path>
                    <path d="M23 11h-6"></path>
                </svg>
            )
        },
        {
            name: "Categories",
            path: "/dashboard/categories",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path d="M4 4h6v6H4z"></path>
                    <path d="M14 4h6v6h-6z"></path>
                    <path d="M4 14h6v6H4z"></path>
                    <path d="M14 14h6v6h-6z"></path>
                </svg>
            )
        }
    ];

    if (UserRole === "admin") {
        menus.push({
            name: "Settings",
            path: "/dashboard/site-settings",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="M4.93 4.93l2.83 2.83"></path>
                    <path d="M16.24 16.24l2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="M4.93 19.07l2.83-2.83"></path>
                    <path d="M16.24 7.76l2.83-2.83"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            )
        });
    }

    return (
        <div className="drawer-side z-50">
            <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>

            <aside className="w-72 min-h-full bg-base-100 border-r border-base-300 flex flex-col">

                {/* Logo */}
                <div className="h-16 border-b border-base-300 flex items-center px-6">
                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-lg shadow">
                            IP
                        </div>

                        <div>
                            <h2 className="font-bold text-lg leading-none">
                                IntelliOps
                            </h2>
                            <p className="text-xs text-base-content/60 mt-1">
                                ERP Dashboard
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <ul className="menu p-4 w-full flex-1 gap-2">

                    {menus.map((menu) => {

                        const isActive = location.pathname.split("/")[2] === menu.path.split("/")[2];

                        return (
                            <li key={menu.path}>
                                <Link
                                    to={menu.path}
                                    className={`
                                        flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                                        ${isActive
                                            ? 'bg-primary text-primary-content font-medium'
                                            : 'hover:bg-base-200'
                                        }
                                    `}
                                >
                                    {menu.icon}

                                    <span>{menu.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Footer */}
                <div className="p-4 border-t border-base-300">
                    <div className="rounded-xl bg-base-200 p-4">
                        <p className="text-sm font-medium">
                            IntelliOps ERP
                        </p>

                        <p className="text-xs text-base-content/60 mt-1">
                            Version 1.0.0
                        </p>
                    </div>
                </div>

            </aside>
        </div>
    );
};

export default DashboardSidebar;