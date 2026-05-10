import React, { useState } from 'react';
import { Link } from 'react-router';
import { Dropdown, Image, Input, Popconfirm, Select } from 'antd';
import AntdTable from '../../../components/ui/AntdTable';
import {
    useGetUsersQuery,
    useDeleteUserMutation
} from '../../../redux/features/users/usersApi';
import useAuthUser from '../../../hooks/useAuthUser';

const UserList = () => {
    const [queryParams, setQueryParams] = useState({
        page: 1,
        per_page: 10,
        search: "",
        status: ""
    });

    /* ================= QUERY ================= */
    const { data, isLoading } = useGetUsersQuery(queryParams);
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
    const { isAdmin } = useAuthUser();

    /* ================= HANDLERS ================= */
    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId).unwrap();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            align: 'left',
            render: (name, record) => (
                <div className="flex items-center gap-2">
                    {/* Click image -> preview popup */}
                    <Image
                        src={record.image_url}
                        alt={name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        preview={{
                            mask: "View",
                        }}
                    />

                    {/* Click name -> navigate */}
                    <Link
                        to={`/users/${record.id}`}
                        className="font-medium text-primary"
                    >
                        {name}
                    </Link>
                </div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            align: 'center',
            render: (roles) => (
                <div className="flex flex-wrap gap-1 justify-center">
                    {roles.map(role => (
                        <span key={role.id} className="badge badge-primary">
                            {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                        </span>
                    ))}
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            render: (status) => (
                <span className={`badge ${status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'right',
            render: (_, record) => {

                const items = [
                    {
                        key: 'view',
                        label: <Link to={`/users/${record.id}`}>View</Link>,
                    },
                    isAdmin && {
                        key: 'edit',
                        label: <Link to={`/users/${record.id}/edit`}>Edit</Link>,
                    },
                    isAdmin && {
                        key: 'delete',
                        danger: true,
                        label: (
                            <Popconfirm
                                title="Delete User"
                                description="Are you sure you want to delete this user?"
                                onConfirm={() => handleDelete(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <span>Delete</span>
                            </Popconfirm>
                        ),
                    }
                ].filter(Boolean);

                return (
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <button className="btn btn-sm btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="size-4"
                            >
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="19" r="1" />
                            </svg>
                        </button>
                    </Dropdown>
                );
            }
        }
    ];

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold">
                        Users
                    </h1>

                    <p className="text-base-content/60 mt-1">
                        Manage all users from here.
                    </p>
                </div>

                <Link
                    to="/dashboard/users/create"
                    className="btn btn-primary"
                >
                    + Create User
                </Link>

            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4">

                <div className="flex flex-col lg:flex-row gap-4">

                    <Input
                        size="large"
                        placeholder="Search users..."
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
                                status: value,
                            }))
                        }
                        options={[
                            {
                                label: "Active",
                                value: 'active',
                            },
                            {
                                label: "Inactive",
                                value: 'inactive',
                            },
                        ]}
                    />

                </div>

            </div>

            {/* Table */}
            <div className='rounded-2xl overflow-hidden border border-base-300 bg-base-100'>
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

export default UserList;