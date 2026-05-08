import React, { useEffect, useState } from "react";
import {
    useGetCategoriesQuery,
    useStoreCategoryMutation
} from "../../../redux/features/categories/categoriesApi";

import {
    message,
    Select,
    Input,
    Button,
    Upload,
    Card,
    Breadcrumb
} from "antd";

import {
    UploadOutlined,
    AppstoreAddOutlined
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router";

const CategoryCreate = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        parent_id: null,
        image: null,
        description: "",
    });

    const [preview, setPreview] = useState(null);

    const { data } = useGetCategoriesQuery({
        page: 1,
        per_page: 1000
    });

    const [storeCategory, { isLoading }] =
        useStoreCategoryMutation();

    const [parentOptions, setParentOptions] = useState([]);

    /* ================= PARENT OPTIONS ================= */
    useEffect(() => {

        if (data?.data) {
            setParentOptions(
                data.data.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                }))
            );
        }

    }, [data]);

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

            if (form.parent_id) {
                formData.append("parent_id", form.parent_id);
            }

            if (form.description) {
                formData.append("description", form.description);
            }

            if (form.image) {
                formData.append("image", form.image);
            }

            await storeCategory(formData).unwrap();

            message.success("Category created successfully");

            navigate("/dashboard/categories");

        } catch (error) {

            message.error(
                error?.data?.message ||
                "Failed to create category"
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
                            <Link to="/dashboard/categories">
                                Categories
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
                        <AppstoreAddOutlined />
                        Create Category
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Add a new category with image,
                        parent category and description.
                    </p>
                </div>

                <button
                    className="btn btn-lg"
                    onClick={() => navigate("/dashboard/categories")}
                >
                    Back to Categories
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

                            {/* Parent */}
                            <div>

                                <label className="block mb-2 font-medium">
                                    Parent Category
                                </label>

                                <Select
                                    size="large"
                                    className="w-full"
                                    placeholder="Select parent category"
                                    allowClear
                                    value={form.parent_id}
                                    onChange={(value) =>
                                        handleChange(
                                            "parent_id",
                                            value
                                        )
                                    }
                                    options={parentOptions}
                                />

                            </div>

                            {/* Name */}
                            <div>

                                <label className="block mb-2 font-medium">
                                    Category Name
                                </label>

                                <Input
                                    size="large"
                                    placeholder="Enter category name"
                                    value={form.name}
                                    onChange={(e) =>
                                        handleChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    {/* Description */}
                    <div>

                        <h2 className="text-lg font-semibold mb-5">
                            Description
                        </h2>

                        <Input.TextArea
                            rows={6}
                            size="large"
                            placeholder="Write category description..."
                            value={form.description}
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* Image Upload */}
                    <div>

                        <h2 className="text-lg font-semibold mb-5">
                            Category Image
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

                    {/* Footer */}
                    {/* Footer */}
                    <div className="border-t pt-6 flex justify-end gap-3">

                        {/* Back Button */}
                        <button
                            type="button"
                            className="btn h-11 px-6"
                            onClick={() =>
                                navigate("/dashboard/categories")
                            }
                        >
                            Back to Categories
                        </button>

                        {/* Create Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary h-11 px-8"
                        >
                            {isLoading ? "Creating..." : "Create Category"}
                        </button>

                    </div>

                </form>

            </Card>

        </div>
    );
};

export default CategoryCreate;