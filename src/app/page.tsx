'use client';
import { redirect } from 'next/navigation';

export default function Home() {
    // se houver login, manda para o todos, senao manda para a tela de login
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('login');

    if (!isAuthenticated) {
        redirect('/login');
    }

    redirect('/dashboard');
}
