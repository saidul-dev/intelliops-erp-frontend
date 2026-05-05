import React from 'react';
import { Link } from 'react-router';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';

const Header = () => {
    const user = useAppSelector(selectCurrentUser);
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Intellichase</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <Link to="/dashboard" className="btn">Dashboard</Link> : <Link to="/login" className="btn mr-2">Login</Link>
                }
            </div>
        </div>
    );
};

export default Header;