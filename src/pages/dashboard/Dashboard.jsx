import React from 'react';
import AdminDashboard from './admin/AdminDashboard';
import { UserRole } from '../../constants';
import StaffDashboard from './staff/StaffDashboard';

const Dashboard = () => {
    return (
        <div>
            {UserRole === 'admin' ? (
                <AdminDashboard />
            ) : (
                <StaffDashboard />
            )}
        </div>
    );
};

export default Dashboard;