import React from 'react';
import { Outlet } from 'react-router';
import DashboardHeader from '../components/shared/DashboardHeader';
import DashboardSidebar from '../components/shared/DashboardSidebar';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open bg-base-100">
            <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content flex flex-col min-h-screen">
                <DashboardHeader />

                <main className="flex-1 p-2 lg:p-4 bg-base-100">
                    <div className="rounded-2xl bg-base-200/40 border border-base-300 p-2 min-h-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            <DashboardSidebar />
        </div>
    );
};

export default DashboardLayout;