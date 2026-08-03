'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function HeaderLogo() {
    const { resolvedTheme } = useTheme();

    const logo = resolvedTheme === 'dark' ? '/img/logo-dark.svg' : '/img/logo.svg';

    return (
        <header className="flex items-center justify-center  mr-2 rounded-md">
            <Image src={logo} alt="Logo" width={36} height={36} priority />
        </header>
    );
}
