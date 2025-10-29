'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export function GitHubBtn() {
    return (
        <button
            onClick={() => signIn('github', { callbackUrl: '/todos' })}
            className="w-80 bg-white border text-xs md:text-[16px] border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 text-neutral-800 font-bold py-2 px-4 rounded-md flex items-center justify-center gap-4 transition-colors duration-300"
        >
            <Image src="/img/github-icon.png" alt="GitHub Icon" width={30} height={30} />
            Continuar com GitHub
        </button>
    );
}
