'use client';
import { redirect } from 'next/navigation';

export default function Home() {
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('login');

    if (!isAuthenticated) {
        redirect('/login');
    }

    redirect('/todos');
}
