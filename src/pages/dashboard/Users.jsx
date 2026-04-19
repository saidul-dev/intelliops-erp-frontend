import React from 'react';
import { UserList, UserRole } from '../../constants';

const Users = () => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            UserList.map((user, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary">View</button>
                                        {
                                            UserRole === 'admin' && (
                                                <>
                                                    <button className="btn btn-sm btn-primary">Edit</button>
                                                    <button className="btn btn-sm btn-danger ml-2">Delete</button>
                                                </>
                                            )
                                        }
                                    </td>

                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;