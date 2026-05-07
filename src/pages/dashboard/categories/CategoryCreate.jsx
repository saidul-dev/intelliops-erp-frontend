import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery, useStoreCategoryMutation } from "../../../redux/features/categories/categoriesApi";
import { message, Select, Input, Button } from "antd";
import { useNavigate } from "react-router";

const CategoryCreate = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        parent_id: null,
        image: null,
    });

    const { data } = useGetCategoriesQuery({ page: 1, per_page: 1000 });
    const [storeCategory, { isLoading }] = useStoreCategoryMutation();

    const [parentOptions, setParentOptions] = useState([]);

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

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleImageChange = (e) => {
        setForm((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", form.name);

            if (form.parent_id) {
                formData.append("parent_id", form.parent_id);
            }

            if (form.image) {
                formData.append("image", form.image);
            }

            await storeCategory(formData).unwrap();

            message.success("Category created successfully");

            setForm({
                name: "",
                parent_id: null,
                image: null,
            });

            navigate("/dashboard/categories");
        } catch (error) {
            message.error(error?.data?.message || "Failed to create category");
        }
    };

    return (
        <div className="w-full px-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Create New Category</h1>
                <p className="text-gray-500">
                    Add a new category with parent and image
                </p>
            </div>

            {/* Form Container */}
            <div className="w-full bg-white p-8 rounded-lg shadow">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Parent Category */}
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

                    {/* Category Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Category Name
                        </label>
                        <Input
                            size="large"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter category name"
                            className="w-full"
                        />
                    </div>


                    {/* Image Upload */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Category Image
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            size="large"
                            className="w-full"
                        >
                            Create Category
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CategoryCreate;