import React from "react";

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button className="btn btn-primary btn-sm">
                    Generate Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Users</h2>
                        <p className="text-3xl font-bold">1,245</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Orders</h2>
                        <p className="text-3xl font-bold">320</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Revenue</h2>
                        <p className="text-3xl font-bold">$12,450</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">Recent Activity</h2>
                    <ul className="space-y-2 text-sm">
                        <li>✔ New user registered</li>
                        <li>✔ Order #1024 completed</li>
                        <li>✔ Product updated</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;