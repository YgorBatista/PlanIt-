'use client';

import Header from '@/app/layout/header';
import Footer from '@/app/layout/footer';
import React from 'react';
import { LoginSignUp } from '@/app/features/auth/components/AuthView';

const Page = () => {
    return (
        <div className="  min-h-screen flex flex-col  font-open_sans">
            <Header />

            <LoginSignUp />

            <Footer />
        </div>
    );
};

export default Page;
