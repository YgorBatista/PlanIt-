'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/utils/auth';
import { useRouter } from 'next/navigation';

export const LogoutBtn = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Fazer logout usando a função de autenticação
        logout();
        // Disparar evento de logout
        window.dispatchEvent(new Event('userLogout'));

        // Redirecionar para login
        window.location.href = '/login';
    };

    return (
        <Button onClick={handleLogout} size="icon" className="w-16 h-8  bg-red-700/70 hover:bg-red-700 hover:font-bold rounded-sm transition-all duration-500 hover:w-20 ">
            Sair
        </Button>
    );
};
