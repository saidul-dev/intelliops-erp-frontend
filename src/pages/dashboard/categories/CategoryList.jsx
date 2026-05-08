import React, { useMemo, useState } from "react";
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation
} from "../../../redux/features/categories/categoriesApi";

import AntdTable from "../../../components/ui/AntdTable";
import { Link } from "react-router";
import {
    message,
    Popconfirm,
    Tag,
    Input,
    Select,
    Tooltip,
    Dropdown
} from "antd";

const CategoryList = () => {

    const [queryParams, setQueryParams] = useState({
        page: 1,
        per_page: 10,
        search: "",
        is_active: "",
    });

    /* ================= QUERY ================= */
    const { data, isLoading } = useGetCategoriesQuery(queryParams);

    const [deleteCategory, { isLoading: deleteLoading }] =
        useDeleteCategoryMutation();

    /* ================= HANDLERS ================= */
    const handleDelete = async (id) => {
        try {
            await deleteCategory(id).unwrap();
            message.success("Category deleted successfully");
        } catch (error) {
            message.error(error?.data?.message || "Delete failed");
        }
    };

    /* ================= STATS ================= */
    const stats = useMemo(() => {

        const categories = data?.data || [];

        return {
            total: data?.total || 0,
            active: categories.filter((item) => item.is_active).length,
            inactive: categories.filter((item) => !item.is_active).length,
        };

    }, [data]);

    /* ================= COLUMNS ================= */
    const columns = [
        {
            title: "Category",
            dataIndex: "name",
            width: 280,
            render: (value, record) => (
                <div className="flex items-center gap-3">

                    <div className="avatar">
                        <div className="w-12 h-12 rounded-xl border bg-base-100">
                            {record?.image_url ? (
                                <img
                                    src={record.image_url}
                                    alt={value}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm font-bold">
                                    {value?.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <Link
                            to={`/dashboard/categories/${record.id}`}
                            className="font-semibold hover:text-primary transition"
                        >
                            {value}
                        </Link>

                        <p className="text-xs text-base-content/60 mt-1">
                            ID: #{record.id}
                        </p>
                    </div>

                </div>
            ),
        },

        {
            title: "Slug",
            dataIndex: "slug",
            align: "center",
            render: (value) => (
                <code className="bg-base-200 px-2 py-1 rounded text-xs">
                    {value}
                </code>
            ),
        },

        {
            title: "Status",
            dataIndex: "is_active",
            align: "center",
            render: (value) => (
                <Tag
                    color={value ? "success" : "error"}
                    className="px-3 py-1 rounded-full font-medium"
                >
                    {value ? "Active" : "Inactive"}
                </Tag>
            ),
        },

        {
            title: "Created",
            dataIndex: "created_at",
            align: "center",
            render: (value) => (
                <div>
                    <p className="font-medium">
                        {new Date(value).toLocaleDateString()}
                    </p>

                    <p className="text-xs text-base-content/60">
                        {new Date(value).toLocaleTimeString()}
                    </p>
                </div>
            ),
        },

        {
            title: "Actions",
            dataIndex: "actions",
            align: "right",
            width: 120,
            render: (_, record) => {

                const items = [
                    {
                        key: "edit",
                        label: (
                            <Link
                                to={`/dashboard/categories/edit/${record.id}`}
                            >
                                Edit
                            </Link>
                        ),
                    },
                    {
                        key: "view",
                        label: (
                            <Link
                                to={`/dashboard/categories/${record.id}`}
                            >
                                View
                            </Link>
                        ),
                    },
                    {
                        key: "delete",
                        danger: true,
                        label: (
                            <Popconfirm
                                title="Delete Category"
                                description="Are you sure you want to delete this category?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDelete(record.id)}
                            >
                                <span>Delete</span>
                            </Popconfirm>
                        ),
                    },
                ];

                return (
                    <Dropdown
                        menu={{ items }}
                        trigger={["click"]}
                    >
                        <button className="btn btn-sm btn-ghost">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="size-4"
                            >
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>

                        </button>
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold">
                        Categories
                    </h1>

                    <p className="text-base-content/60 mt-1">
                        Manage all product categories from here.
                    </p>
                </div>

                <Link
                    to="/dashboard/categories/create"
                    className="btn btn-primary"
                >
                    + Create Category
                </Link>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
                    <p className="text-sm text-base-content/60">
                        Total Categories
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {stats.total}
                    </h2>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
                    <p className="text-sm text-base-content/60">
                        Active Categories
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-success">
                        {stats.active}
                    </h2>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
                    <p className="text-sm text-base-content/60">
                        Inactive Categories
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-error">
                        {stats.inactive}
                    </h2>
                </div>

            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4">

                <div className="flex flex-col lg:flex-row gap-4">

                    <Input
                        size="large"
                        placeholder="Search category..."
                        allowClear
                        onChange={(e) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                page: 1,
                                search: e.target.value,
                            }))
                        }
                    />

                    <Select
                        size="large"
                        placeholder="Filter Status"
                        allowClear
                        className="min-w-[200px]"
                        onChange={(value) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                page: 1,
                                is_active: value,
                            }))
                        }
                        options={[
                            {
                                label: "Active",
                                value: 1,
                            },
                            {
                                label: "Inactive",
                                value: 0,
                            },
                        ]}
                    />

                </div>

            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden border border-base-300 bg-base-100">

                <AntdTable
                    columns={columns}
                    data={data?.data || []}
                    loading={isLoading || deleteLoading}
                    isPagination={true}
                    pagination={data}
                    setQuery={setQueryParams}
                />

            </div>

        </div>
    );
};

export default CategoryList;