import React from 'react';
import { logOut } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../redux/hooks';
import { persistor } from '../../redux/store';
import { baseApi } from '../../redux/api/baseApi';
import { useLogoutMutation } from '../../redux/features/auth/authApi';

const DashboardHeader = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            await logout(undefined).unwrap();
        } catch (error) {
            console.error("Logout request failed:", error);
            // Still clear local auth if the server logout request fails.
        } finally {
            dispatch(logOut());
            dispatch(baseApi.util.resetApiState());
            await persistor.flush();
            await persistor.purge();
            navigate("/login", { replace: true });
        }
    };

    return (
        <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                {/* Sidebar toggle icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
            </label>
            <div className="px-4">Intelliops ERP</div>
            <div className="ml-auto">
                {/* Logout button */}
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    {isLoading ? "Logging out..." : "Logout"}
                </button>
            </div>
        </nav>
    );
};

export default DashboardHeader;
