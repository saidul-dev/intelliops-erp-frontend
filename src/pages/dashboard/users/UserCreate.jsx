import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
    useStoreUserMutation
} from '../../../redux/features/users/usersApi';
import { Breadcrumb, Card, Input, message, Select, Upload } from 'antd';

import {
    UploadOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";

const UserCreate = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        roles: [],
        status: "",
    });

    const [preview, setPreview] = useState(null);

    const [storeUser, { isLoading }] = useStoreUserMutation();

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    /* ================= IMAGE CHANGE ================= */
    const handleImageChange = ({ file }) => {

        setForm((prev) => ({
            ...prev,
            image: file,
        }));

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            form.role.forEach((role) => {
                formData.append("roles[]", role);
            });
            formData.append("status", form.status);

            if (form.image) {
                formData.append("image", form.image);
            }

            await storeUser(formData).unwrap();

            message.success("User created successfully");

            navigate("/dashboard/users");

        } catch (error) {

            message.error(
                error?.data?.message ||
                "Failed to create user"
            );
        }
    };

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
                        title: "Create",
                    },
                ]}
            />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <UsergroupAddOutlined />
                        Create User
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Add a new user with email, name and role.
                    </p>
                </div>

                <button
                    className="btn btn-lg"
                    onClick={() => navigate("/dashboard/users")}
                >
                    Back to Users
                </button>

            </div>

            {/* Form */}
            <Card className="rounded-2xl shadow-sm border-0">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* Basic Info */}
                    <div>

                        <h2 className="text-lg font-semibold mb-5">
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Name */}
                            <div>

                                <label className="block mb-2 font-medium">
                                    Name
                                </label>

                                <Input
                                    size="large"
                                    placeholder="Enter user name"
                                    value={form.name}
                                    onChange={(e) =>
                                        handleChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* Email */}
                            <div>

                                <label className="block mb-2 font-medium">
                                    Email
                                </label>

                                <Input
                                    size="large"
                                    placeholder="Enter user email"
                                    value={form.email}
                                    onChange={(e) =>
                                        handleChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* Password */}
                            <div>

                                <label className="block mb-2 font-medium">
                                    Password
                                </label>

                                <Input
                                    size="large"
                                    placeholder="Enter user password"
                                    value={form.password}
                                    onChange={(e) =>
                                        handleChange(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* Role */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Role
                                </label>

                                <Select
                                    mode="multiple"
                                    size="large"
                                    placeholder="Select user roles"
                                    value={form.role}
                                    className="w-full"
                                    onChange={(value) =>
                                        handleChange("role", value)
                                    }
                                >
                                    <Select.Option value="1">
                                        Admin
                                    </Select.Option>

                                    <Select.Option value="2">
                                        HR
                                    </Select.Option>

                                    <Select.Option value="3">
                                        Staff
                                    </Select.Option>
                                </Select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Status
                                </label>

                                <Select
                                    size="large"
                                    placeholder="Select status"
                                    value={form.status}
                                    className="w-full"
                                    onChange={(value) =>
                                        handleChange("status", value)
                                    }
                                >
                                    <Select.Option value="">Select Status</Select.Option>
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="inactive">Inactive</Select.Option>
                                </Select>
                            </div>

                            {/* Image Upload */}
                            <div>

                                <h2 className="text-lg font-semibold mb-5">
                                    User Image
                                </h2>

                                <div className="flex flex-col lg:flex-row gap-6 items-start">

                                    {/* Upload */}
                                    <Upload
                                        beforeUpload={() => false}
                                        showUploadList={false}
                                        onChange={handleImageChange}
                                    >
                                        <button className="btn btn-primary btn-outline btn-lg h-11 flex items-center gap-2">
                                            <UploadOutlined />
                                            Upload Image
                                        </button>
                                    </Upload>

                                    {/* Preview */}
                                    {preview && (
                                        <div className="w-40 h-40 rounded-2xl overflow-hidden border bg-base-100">

                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />

                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* Footer */}
                    <div className="border-t pt-6 flex justify-end gap-3">

                        {/* Back Button */}
                        <button
                            type="button"
                            className="btn h-11 px-6"
                            onClick={() =>
                                navigate("/dashboard/users")
                            }
                        >
                            Back to Users
                        </button>

                        {/* Create Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary h-11 px-8"
                        >
                            {isLoading ? "Creating..." : "Create User"}
                        </button>

                    </div>

                </form>

            </Card>

        </div>
    );
};

export default UserCreate;