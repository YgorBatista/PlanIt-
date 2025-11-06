'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export function GoogleBtn() {
    return (
        <button
            onClick={() => signIn('google', { callbackUrl: '/todos' })}
            className=" w-80 hover:w-[340px] bg-white border text-xs md:text-[14px] border-neutral-300 dark:border-neutral-600 hover:bg-[#E2E8F0]  hover:dark:bg-[#638199]   text-neutral-800 dark:hover:text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-4 transition-all duration-300"
        >
            <Image src="/img/google-icon.png" alt="Google Icon" width={30} height={30} />
            Continuar com Google
        </button>
    );
}
