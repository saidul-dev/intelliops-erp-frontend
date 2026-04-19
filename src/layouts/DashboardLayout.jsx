import React from 'react';
import { Outlet } from 'react-router';
import DashboardHeader from '../components/shared/DashboardHeader';
import DashboardSidebar from '../components/shared/DashboardSidebar';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <DashboardHeader />
                {/* Page content here */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
            {/* Sidebar */}
            <DashboardSidebar />
        </div>
    );
};

export default DashboardLayout;