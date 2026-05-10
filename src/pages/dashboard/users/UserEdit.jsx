import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
    Breadcrumb,
    Card,
    Input,
    message,
    Select,
    Upload,
    Skeleton,
} from "antd";

import {
    UploadOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";

import {
    useShowUserQuery,
    useUpdateUserMutation,
} from "../../../redux/features/users/usersApi";

const UserEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useShowUserQuery(id);
    const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        roles: [],
        status: "",
    });

    /* ================= LOAD DATA ================= */
    useEffect(() => {
        if (data) {
            setForm({
                name: data?.name || "",
                email: data?.email || "",
                password: "",
                roles: data?.roles?.map((r) => String(r.id)) || [],
                status: data?.status || "",
            });

            setPreview(data?.image_url);
        }
    }, [data]);

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleImageChange = ({ file }) => {
        setForm((prev) => ({
            ...prev,
            image: file,
        }));

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    /* ================= UPDATE ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("_method", "PUT");
            formData.append("name", form.name);
            formData.append("email", form.email);

            if (form.password) {
                formData.append("password", form.password);
            }

            form.roles.forEach((role) => {
                formData.append("roles[]", role);
            });

            formData.append("status", form.status);

            if (form.image) {
                formData.append("image", form.image);
            }

            await updateUser({ id, data: formData }).unwrap();

            message.success("User updated successfully");

            navigate("/dashboard/users");

        } catch (error) {
            message.error(
                error?.data?.message || "Update failed"
            );
        }
    };

    if (isLoading) {
        return <Skeleton active />;
    }

    return (
        <div className="space-y-6">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { title: <Link to="/dashboard">Dashboard</Link> },
                    { title: <Link to="/dashboard/users">Users</Link> },
                    { title: "Update" },
                ]}
            />

            {/* Header */}
            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <UsergroupAddOutlined />
                        Update User
                    </h1>
                </div>

                <button
                    className="btn"
                    onClick={() => navigate("/dashboard/users")}
                >
                    Back
                </button>

            </div>

            {/* Form */}
            <Card className="rounded-2xl border-0 shadow-sm">

                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Name
                            </label>

                            <Input
                                size="large"
                                value={form.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Email
                            </label>

                            <Input
                                size="large"
                                value={form.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Password (optional)
                            </label>

                            <Input
                                size="large"
                                placeholder="Leave blank to keep old password"
                                value={form.password}
                                onChange={(e) =>
                                    handleChange("password", e.target.value)
                                }
                            />
                        </div>

                        {/* Roles */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Roles
                            </label>

                            <Select
                                mode="multiple"
                                size="large"
                                value={form.roles}
                                className="w-full"
                                onChange={(value) =>
                                    handleChange("roles", value)
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
                            <label className="mb-2 block font-medium">
                                Status
                            </label>

                            <Select
                                size="large"
                                value={form.status}
                                className="w-full"
                                onChange={(value) =>
                                    handleChange("status", value)
                                }
                            >
                                <Select.Option value="active">
                                    Active
                                </Select.Option>
                                <Select.Option value="inactive">
                                    Inactive
                                </Select.Option>
                            </Select>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Image
                            </label>

                            <div className="flex gap-4 items-start">

                                <Upload
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                    onChange={handleImageChange}
                                >
                                    <button type="button" className="btn btn-primary btn-outline btn-lg h-11 flex items-center gap-2">
                                        <UploadOutlined />
                                        Change Image
                                    </button>

                                </Upload>

                                {preview && (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-32 h-32 rounded-xl object-cover border"
                                    />
                                )}

                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="border-t pt-6 flex justify-end gap-3">

                        <button
                            type="button"
                            className="btn"
                            onClick={() =>
                                navigate("/dashboard/users")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={updating}
                        >
                            {updating ? "Updating..." : "Update User"}
                        </button>

                    </div>

                </form>

            </Card>

        </div>
    );
};

export default UserEdit;