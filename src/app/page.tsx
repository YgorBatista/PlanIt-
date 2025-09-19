import { redirect } from 'next/navigation';

export default function Home() {
    // aqui você pode trocar por verificação real (cookies, JWT, etc.)
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('auth');

    if (!isAuthenticated) {
        redirect('/auth');
    }

    redirect('/todos');
}
