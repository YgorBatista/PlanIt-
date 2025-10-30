'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const LogoutBtn = () => {
    const router = useRouter();

    const handleLogout = async () => {
        document.cookie = 'manualName=: path=/; max-age=0';
        document.cookie = 'userEmail=: path=/; max-age=0';

        localStorage.removeItem('manualName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('auth');

        await signOut({ redirect: false });

        window.dispatchEvent(new Event('userLogout'));

        router.push('/login');
    };
    return (
        <Button onClick={handleLogout} size="icon" className="w-16 h-8  bg-red-700/50 hover:bg-red-700 hover:font-bold transition-all duration-500 hover:w-20 ">
            Sair
        </Button>
    );
};
