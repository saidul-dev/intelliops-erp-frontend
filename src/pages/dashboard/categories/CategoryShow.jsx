import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { Image, Skeleton, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetCategoriesQuery } from '../../../redux/features/categories/categoriesApi';

const CategoryShow = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    // Data from listing page
    const initialCategory = location.state?.category;

    // Fetch fresh data
    const { data, isLoading } = useGetCategoriesQuery(id);

    // Use fresh data first, fallback to listing data
    const category = data?.data || initialCategory;

    if (isLoading && !category) {
        return (
            <div className="bg-base-100 rounded-2xl p-6 border border-base-300">
                <Skeleton active avatar paragraph={{ rows: 6 }} />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">

                <div>
                    <div className="flex items-center gap-3">

                        <Link
                            to="/dashboard/categories"
                            className="btn btn-sm btn-ghost"
                        >
                            <ArrowLeftOutlined />
                        </Link>

                        <div>
                            <h1 className="text-3xl font-bold">
                                Category Details
                            </h1>

                            <p className="text-base-content/60 mt-1">
                                View complete information about this category.
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    className="btn btn-lg"
                    onClick={() => navigate("/dashboard/categories")}
                >
                    <ArrowLeftOutlined />
                    Back to Categories
                </button>

            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Card */}
                <div className="lg:col-span-1">

                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6">

                        <div className="flex flex-col items-center text-center">

                            <Image
                                src={category?.image_url}
                                alt={category?.name}
                                width={180}
                                height={180}
                                className="rounded-2xl object-cover"
                                fallback="https://placehold.co/180x180?text=No+Image"
                            />

                            <h2 className="text-2xl font-bold mt-5">
                                {category?.name}
                            </h2>

                            <p className="text-base-content/60 mt-1">
                                Category ID: #{category?.id}
                            </p>

                            <Tag
                                color={
                                    category?.is_active
                                        ? 'success'
                                        : 'error'
                                }
                                className="mt-4 text-sm px-4 py-1"
                            >
                                {category?.is_active
                                    ? 'Active'
                                    : 'Inactive'}
                            </Tag>

                        </div>

                    </div>

                </div>

                {/* Right Details */}
                <div className="lg:col-span-2">

                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6">

                        <h3 className="text-xl font-semibold mb-6">
                            Category Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div className="bg-base-200 rounded-xl p-4">
                                <p className="text-sm text-base-content/60">
                                    Category Name
                                </p>

                                <h4 className="font-semibold mt-1">
                                    {category?.name || 'N/A'}
                                </h4>
                            </div>

                            <div className="bg-base-200 rounded-xl p-4">
                                <p className="text-sm text-base-content/60">
                                    Slug
                                </p>

                                <code className="font-medium">
                                    {category?.slug || 'N/A'}
                                </code>
                            </div>

                            <div className="bg-base-200 rounded-xl p-4">
                                <p className="text-sm text-base-content/60">
                                    Status
                                </p>

                                <h4 className="font-semibold mt-1">
                                    {category?.is_active
                                        ? 'Active'
                                        : 'Inactive'}
                                </h4>
                            </div>

                            <div className="bg-base-200 rounded-xl p-4">
                                <p className="text-sm text-base-content/60">
                                    Category ID
                                </p>

                                <h4 className="font-semibold mt-1">
                                    #{category?.id}
                                </h4>
                            </div>

                        </div>

                        {/* Optional description */}
                        {category?.description && (
                            <div className="mt-6">

                                <h4 className="font-semibold mb-2">
                                    Description
                                </h4>

                                <div className="bg-base-200 rounded-xl p-4 text-base-content/80">
                                    {category.description}
                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CategoryShow;