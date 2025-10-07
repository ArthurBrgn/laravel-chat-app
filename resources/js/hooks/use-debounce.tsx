import { useCallback, useRef } from 'react';

export function useDebounceFn<Args extends unknown[]>(
    fn: (...args: Args) => void,
    delay = 300,
) {
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    return useCallback(
        (...args: Args) => {
            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => fn(...args), delay);
        },
        [fn, delay],
    );
}
