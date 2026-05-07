import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery, useStoreCategoryMutation } from "../../../redux/features/categories/categoriesApi";
import { message, Select, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CategoryCreate = () => {
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

    /* ================= HANDLERS ================= */
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
        } catch (error) {
            message.error(error?.data?.message || "Failed to create category");
        }
    };

    return (
        <div className="max-w-xl bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Create New Category</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Category Name */}
                <div>
                    <label className="block mb-1 font-medium">
                        Category Name
                    </label>
                    <Input
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter category name"
                    />
                </div>

                {/* Parent Category */}
                <div>
                    <label className="block mb-1 font-medium">
                        Parent Category
                    </label>
                    <Select
                        className="w-full"
                        placeholder="Select parent category"
                        allowClear
                        value={form.parent_id}
                        onChange={(value) => handleChange("parent_id", value)}
                        options={parentOptions}
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">
                        Category Image
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Submit */}
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className="w-full"
                >
                    Create Category
                </Button>
            </form>
        </div>
    );
};

export default CategoryCreate;