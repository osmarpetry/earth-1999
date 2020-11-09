import { useEffect, useState } from 'react'

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const delayHandller = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(delayHandller)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
