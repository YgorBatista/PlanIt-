'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider {...props} enableSystem={true} attribute="class">
            <div className="min-h-screen transition-all duration-300 ease-in-out">{children}</div>
        </NextThemesProvider>
    );
}
