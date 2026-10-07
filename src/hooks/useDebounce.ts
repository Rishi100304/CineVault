import { useEffect, useState } from "react";


export function useDebounce<T>(value: T, delay: number = 500): T{
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const searcher = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(searcher)
        }
    }, [value, delay])

    return debouncedValue
}