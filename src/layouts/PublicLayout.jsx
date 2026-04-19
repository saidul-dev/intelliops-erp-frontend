import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const PublicLayout = () => {
    return (
        <div>
            <Header />
            <main className='min-h-screen'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;