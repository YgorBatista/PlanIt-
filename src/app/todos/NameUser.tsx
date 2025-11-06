'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function NameUser() {
    const { data: session } = useSession();
    const [name, setName] = useState('');

    const updateName = () => {
        const manualName = localStorage.getItem('manualName');
        if (session?.user?.name) {
            setName(session.user.name);
        } else if (manualName) {
            setName(manualName);
        } else setName('');
    };

    useEffect(() => {
        updateName();

        const handleLogin = () => updateName();
        const handleLogout = () => setName('');

        window.addEventListener('userLogout', handleLogout);
        window.addEventListener('userLogin', handleLogin);

        return () => {
            window.removeEventListener('userLogout', handleLogout);
            window.removeEventListener('userLogin', handleLogin);
        };
    }, [session]);

    return <div className="font-bold  ml-2 uppercase">{name}!</div>;
}
