import { useEffect, useState } from "react";


export function useDebounce(value, delay){
    const [debouncedValue, setDebouncedValue] = useState("")

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