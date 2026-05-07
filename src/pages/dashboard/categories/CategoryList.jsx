import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import AntdTable from "../../../components/ui/AntdTable";
import { Link } from "react-router";
import { Tag } from "antd";

const CategoryList = () => {
    const [queryParams, setQueryParams] = useState({
        page: 1,
        per_page: 10,
    });

    /* ================= RTK QUERY ================= */
    const { data, isLoading } = useGetCategoriesQuery(queryParams);

    /* ================= COLUMNS ================= */
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
            render: (value, record) => <div>
                <Link to={`/categories/${record.id}`}>{value}</Link>
            </div>
        },
        {
            title: "Image",
            dataIndex: "image_url",
            align: "center",
            render: (value) =>
                value ? (
                    <img
                        src={value}
                        alt="category"
                        className="w-12 h-12 object-cover rounded mx-auto"
                    />
                ) : (
                    "-"
                ),
        },
        {
            title: "Slug",
            dataIndex: "slug",
            align: "center"
        },
        {
            title: "Status",
            dataIndex: "is_active",
            align: "center",
            render: (value) => <Tag color={value ? "green" : "red"}>{value ? "Active" : "Inactive"}</Tag>,
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            align: "center",
            render: (value) =>
                value ? new Date(value).toLocaleDateString() : "-",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            align: "right",
            render: (_, record) => {
                return (
                    <div className="flex justify-end gap-2">
                        <button className="btn btn-sm btn-primary">
                            Edit
                        </button>

                        <button className="btn btn-sm btn-danger">
                            Delete
                        </button>
                    </div>
                );
            }
        }
    ];


    return (
        <div style={{ padding: 20 }} className="relative z-0">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-semibold">
                    Categories
                </h2>

                <Link
                    to="/dashboard/categories/create"
                    className="btn btn-primary"
                >
                    + Create Category
                </Link>
            </div>

            <AntdTable
                columns={columns}
                data={data?.data || []}
                loading={isLoading}
                isPagination={true}
                pagination={data}
                setQuery={setQueryParams}
            />
        </div>
    );
};

export default CategoryList;