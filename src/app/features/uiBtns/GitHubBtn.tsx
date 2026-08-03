'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export function GitHubBtn() {
    return (
        <button
            onClick={() => signIn('github', { callbackUrl: '/todos' })}
            className="w-60 py-2 px-4 flex items-center justify-center gap-4 text-xs md:text-[14px] text-black dark:hover:text-neutral-200 font-bold bg-white dark:bg-neutral-100  border  dark:border-[#e2e8f023]  hover:bg-[#0c7477] dark:hover:bg-[#0c7477] hover:bg-opacity-20 dark:hover:bg-opacity-60 rounded-md  transition-all duration-300"
        >
            <Image src="/img/github-icon.png" alt="GitHub Icon" width={30} height={30} />
            Continuar com GitHub
        </button>
    );
}
