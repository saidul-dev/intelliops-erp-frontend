import React from "react";

const StaffDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Staff Dashboard</h1>
                <p className="text-sm text-gray-500">
                    Welcome back! Here's your daily overview.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Tasks</h2>
                        <p className="text-3xl font-bold">8</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Pending Approvals</h2>
                        <p className="text-3xl font-bold">3</p>
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">Today's Tasks</h2>

                    <div className="space-y-2 mt-2">
                        <div className="flex justify-between p-2 border rounded">
                            <span>Check new orders</span>
                            <span className="badge badge-warning">Pending</span>
                        </div>

                        <div className="flex justify-between p-2 border rounded">
                            <span>Update inventory</span>
                            <span className="badge badge-success">Done</span>
                        </div>

                        <div className="flex justify-between p-2 border rounded">
                            <span>Customer support tickets</span>
                            <span className="badge badge-info">In Progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;