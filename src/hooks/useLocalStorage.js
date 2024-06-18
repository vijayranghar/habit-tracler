import { useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue) {
  let [localStorageValue, setLocalStorage] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      );
    } catch {
      value = defaultValue;
    }
    return value;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [localStorageValue, key]);
  return [localStorageValue, setLocalStorage];
}
