import { useRef } from 'react';

export function useThrottleFn<T extends (...args: unknown[]) => void>(
    fn: T,
    delay = 300,
) {
    const lastCall = useRef(0);

    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCall.current >= delay) {
            lastCall.current = now;
            fn(...args);
        }
    };
}
