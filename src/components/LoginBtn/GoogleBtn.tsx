'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export function GoogleBtn() {
    return (
        <button
            onClick={() => signIn('google', { callbackUrl: '/todos' })}
            className=" w-60 sm:w-80 bg-white border text-xs md:text-[16px] border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 text-neutral-800 font-bold py-2 px-4 rounded-md flex items-center justify-center gap-4 transition-colors duration-300"
        >
            <Image src="/img/google-icon.png" alt="Google Icon" width={30} height={30} />
            Continuar com Google
        </button>
    );
}
