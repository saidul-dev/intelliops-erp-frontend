import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Breadcrumb, Card, Image, Skeleton, Tag } from "antd";
import {
    ArrowLeftOutlined,
    UserOutlined,
    MailOutlined,
    IdcardOutlined,
} from "@ant-design/icons";

import { useShowUserQuery } from "../../../redux/features/users/usersApi";

const UserShow = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useShowUserQuery(id);
    console.log("User data:", data);
    const user = data;

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton active />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    {
                        title: (
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        ),
                    },
                    {
                        title: (
                            <Link to="/dashboard/users">
                                Users
                            </Link>
                        ),
                    },
                    {
                        title: "Details",
                    },
                ]}
            />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold">
                        User Details
                    </h1>

                    <p className="text-base-content/60 mt-1">
                        View complete information about this user.
                    </p>
                </div>

                <button
                    className="btn btn-lg"
                    onClick={() => navigate("/dashboard/users")}
                >
                    <ArrowLeftOutlined />
                    Back to Users
                </button>

            </div>

            {/* User Card */}
            <Card className="rounded-2xl border-0 shadow-sm">

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* User Image */}
                    <div className="flex justify-center">

                        <Image
                            src={user?.image_url}
                            alt={user?.name}
                            width={220}
                            height={220}
                            className="rounded-3xl overflow-hidden object-cover border"
                            preview={{
                                mask: "View",
                            }}
                        />

                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-6">

                        {/* Name + Status */}
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3">

                            <h2 className="text-3xl font-bold">
                                {user?.name}
                            </h2>

                            <Tag
                                color={
                                    user?.status === "active"
                                        ? "success"
                                        : "error"
                                }
                                className="w-fit"
                            >
                                {user?.status === "active"
                                    ? "Active"
                                    : "Inactive"}
                            </Tag>

                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Email */}
                            <div className="rounded-2xl border border-base-300 p-5 bg-base-100">

                                <div className="flex items-center gap-3 mb-2">

                                    <MailOutlined className="text-lg" />

                                    <h3 className="font-semibold">
                                        Email
                                    </h3>

                                </div>

                                <p className="text-base-content/70">
                                    {user?.email || "N/A"}
                                </p>

                            </div>

                            {/* User ID */}
                            <div className="rounded-2xl border border-base-300 p-5 bg-base-100">

                                <div className="flex items-center gap-3 mb-2">

                                    <IdcardOutlined className="text-lg" />

                                    <h3 className="font-semibold">
                                        User ID
                                    </h3>

                                </div>

                                <p className="text-base-content/70">
                                    #{user?.id}
                                </p>

                            </div>

                            {/* Role */}
                            <div className="rounded-2xl border border-base-300 p-5 bg-base-100">

                                <div className="flex items-center gap-3 mb-2">

                                    <UserOutlined className="text-lg" />

                                    <h3 className="font-semibold">
                                        Roles
                                    </h3>

                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {user?.roles?.length > 0 ? (
                                        user.roles.map((role) => (
                                            <Tag
                                                key={role.id}
                                                color="blue"
                                            >
                                                {role.name}
                                            </Tag>
                                        ))
                                    ) : (
                                        <span className="text-base-content/70">
                                            No role assigned
                                        </span>
                                    )}
                                </div>

                            </div>

                            {/* Created At */}
                            <div className="rounded-2xl border border-base-300 p-5 bg-base-100">

                                <h3 className="font-semibold mb-2">
                                    Created At
                                </h3>

                                <p className="text-base-content/70">
                                    {user?.created_at
                                        ? new Date(
                                            user.created_at
                                        ).toLocaleString()
                                        : "N/A"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </Card>

        </div>
    );
};

export default UserShow;