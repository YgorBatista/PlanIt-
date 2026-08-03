import { RefObject, useEffect } from 'react';

/**
 * Hook para detectar clicks fora de um elemento.
 * Aceita um ref genérico para qualquer HTMLElement e um handler.
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null>,
    handler: (event: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        function listener(event: MouseEvent | TouchEvent) {
            const target = event.target as Node | null;
            if (!ref || !ref.current || !target) return;
            if (!ref.current.contains(target)) handler(event);
        }

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}
