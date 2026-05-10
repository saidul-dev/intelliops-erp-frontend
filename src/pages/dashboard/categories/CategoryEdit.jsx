import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} from "../../../redux/features/categories/categoriesApi";

import {
    message,
    Select,
    Input,
    Upload,
    Card,
    Breadcrumb,
    Skeleton,
} from "antd";

import {
    UploadOutlined,
    EditOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router";

const CategoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    /* ================= STATE ================= */

    const [form, setForm] = useState({
        name: "",
        parent_id: null,
        image: null,
        description: "",
        is_active: 1,
    });

    const [preview, setPreview] = useState(null);

    /* ================= QUERY ================= */

    // Single category
    const {
        data: categoryData,
        isLoading: categoryLoading,
    } = useGetCategoryQuery(id);

    // Parent category dropdown
    const { data: categoriesData } =
        useGetCategoriesQuery({
            page: 1,
            per_page: 1000,
        });

    const [
        updateCategory,
        { isLoading: updateLoading },
    ] = useUpdateCategoryMutation();

    const category = categoryData;

    /* ================= PREFILL FORM ================= */

    useEffect(() => {
        if (!category) return;

        setForm({
            name: category.name || "",

            parent_id:
                Number(
                    category.parent_id ||
                    category.parent?.id
                ) || null,

            image: null,

            description:
                category.description || "",

            is_active: Number(
                category.is_active
            ),
        });

        setPreview(
            category.image_url || null
        );
    }, [category]);

    /* ================= PARENT OPTIONS ================= */

    const parentOptions = useMemo(() => {
        return (
            categoriesData?.data
                ?.filter(
                    (cat) =>
                        cat.id !== Number(id)
                )
                ?.map((cat) => ({
                    label: cat.name,
                    value: Number(cat.id),
                })) || []
        );
    }, [categoriesData, id]);

    /* ================= HANDLE CHANGE ================= */

    const handleChange = (
        key,
        value
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    /* ================= IMAGE ================= */

    const handleImageChange = ({
        file,
    }) => {
        setForm((prev) => ({
            ...prev,
            image: file,
        }));

        if (file) {
            setPreview(
                URL.createObjectURL(file)
            );
        }
    };

    /* ================= SUBMIT ================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("_method", "PUT");

            const fields = [
                "name",
                "is_active",
                "parent_id",
                "description",
            ];

            fields.forEach((key) => {
                if (form[key] !== null && form[key] !== "") {
                    formData.append(key, form[key]);
                }
            });

            // file separately
            if (form.image) {
                formData.append("image", form.image);
            }

            await updateCategory({
                categoryId: id,
                payload: formData,
            }).unwrap();

            message.success(
                "Category updated successfully"
            );

            navigate(
                "/dashboard/categories"
            );
        } catch (error) {
            message.error(
                error?.data?.message ||
                "Failed to update category"
            );
        }
    };

    /* ================= LOADING ================= */

    if (categoryLoading) {
        return (
            <Card className="rounded-2xl">
                <Skeleton active />
            </Card>
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
                            <Link to="/dashboard/categories">
                                Categories
                            </Link>
                        ),
                    },
                    {
                        title: "Edit",
                    },
                ]}
            />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <EditOutlined />
                        Edit Category
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Update category information, parent, status and image.
                    </p>
                </div>

                <button
                    className="btn btn-lg"
                    onClick={() =>
                        navigate(
                            "/dashboard/categories"
                        )
                    }
                >
                    <ArrowLeftOutlined />
                    Back to Categories
                </button>
            </div>

            {/* Form */}
            <Card className="rounded-2xl shadow-sm border-0">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* Basic */}
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
                                    onChange={(value) => handleChange("parent_id", value)}
                                    options={parentOptions}
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block mb-2 font-medium">Category Name</label>

                                <Input
                                    size="large"
                                    placeholder="Enter category name"
                                    value={form.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block mb-2 font-medium">Status</label>

                                <Select
                                    size="large"
                                    className="w-full"
                                    value={form.is_active}
                                    onChange={(value) => handleChange("is_active", value)}
                                    options={[
                                        { label: "Active", value: 1 },
                                        { label: "Inactive", value: 0 },
                                    ]}
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
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <h2 className="text-lg font-semibold mb-5">
                            Category Image
                        </h2>

                        <div className="flex flex-col lg:flex-row gap-6 items-start">
                            <Upload
                                beforeUpload={() => false}
                                showUploadList={false}
                                onChange={handleImageChange}
                            >
                                <button type="button" className="btn btn-primary btn-outline btn-lg h-11">
                                    <UploadOutlined />
                                    Change Image
                                </button>
                            </Upload>

                            {preview && (
                                <div className="w-40 h-40 rounded-2xl overflow-hidden border">
                                    <img src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t pt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => navigate("/dashboard/categories")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={updateLoading}
                            className="btn btn-primary"
                        >
                            {updateLoading ? "Updating..." : "Update Category"}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CategoryEdit;