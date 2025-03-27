import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [useDebounce, setUseDebounce] = useState();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setUseDebounce(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return useDebounce;
}

export default useDebounce;
