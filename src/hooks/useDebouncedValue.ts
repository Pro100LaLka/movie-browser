import { useEffect, useState } from "react";

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(debounceTimeout);
  }, [value, delay]);

  return debounced;
}

export default useDebouncedValue;
