import React, { useState } from 'react';
import { UserList, UserRole } from '../../constants';
import { Link } from 'react-router';
import { Dropdown, Popconfirm } from 'antd';
import AntdTable from '../../components/ui/AntdTable';
import {
    useGetUsersQuery,
    useDeleteUserMutation
} from '../../redux/features/users/usersApi';

const Users = () => {
    const [queryParams, setQueryParams] = useState({
        page: 1,
        per_page: 10,
        search: "",
        status: ""
    });

    /* ================= QUERY ================= */
    const { data, isLoading } = useGetUsersQuery(queryParams);
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

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
                <Link to={`/users/${record.id}`} className="font-medium text-primary">
                    {name}
                </Link>
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
                            {role.name}
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
            title: 'Action',
            dataIndex: 'action',
            align: 'right',
            render: (_, record) => {
                const items = [
                    {
                        key: 'view',
                        label: (
                            <Link to={`/users/${record.id}`}>View</Link>
                        ),
                    },
                    {
                        key: 'edit',
                        label: (
                            <Link to={`/users/${record.id}/edit`}>Edit</Link>
                        ),
                    },
                    {
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
                ];

                if (UserRole !== 'admin') {
                    return items.filter(item => item.key === 'view');
                }

                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
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

export default Users;