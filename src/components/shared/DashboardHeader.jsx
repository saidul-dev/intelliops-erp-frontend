import React from 'react';
import { logOut } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../redux/hooks';
import { persistor } from '../../redux/store';
import { baseApi } from '../../redux/api/baseApi';
import { useLogoutMutation } from '../../redux/features/auth/authApi';
import useAuthUser from '../../hooks/useAuthUser';

const DashboardHeader = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();
    const { user } = useAuthUser();

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            await logout(undefined).unwrap();
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            dispatch(logOut());
            dispatch(baseApi.util.resetApiState());
            await persistor.flush();
            await persistor.purge();
            navigate("/login", { replace: true });
        }
    };

    return (
        <nav className="sticky top-0 z-40 h-16 border-b border-base-300 bg-base-100/90 backdrop-blur">
            <div className="navbar px-4 lg:px-6">

                {/* Left */}
                <div className="flex items-center gap-3">

                    <label
                        htmlFor="my-drawer-4"
                        aria-label="open sidebar"
                        className="btn btn-ghost btn-circle lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>

                    <div>
                        <h1 className="text-lg lg:text-xl font-bold">
                            IntelliOps ERP
                        </h1>
                        <p className="text-xs text-base-content/60 hidden sm:block">
                            Smart Business Management System
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="ml-auto flex items-center gap-3">

                    {/* Notification */}
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
                                />
                            </svg>

                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>

                    {/* Profile */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content rounded-full w-10">
                                    {user?.image_url ? (
                                        <img
                                            src={user.image_url}
                                            alt={user.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <span className="font-semibold pl-2">
                                            {user?.name ? user.name.substring(0, 2).toUpperCase() : "SA"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <h3 className="font-semibold leading-none">
                                    {user?.name || "Super Admin"}
                                </h3>
                                <p className="text-xs text-base-content/60 mt-1">
                                    {/* capitalize first letter */}
                                    {user?.roles?.[0]?.name ? user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1) : "Admin"}
                                </p>
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
                        >
                            <li>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={isLoading}
                                    className="text-error"
                                >
                                    {isLoading ? "Logging out..." : "Logout"}
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default DashboardHeader;