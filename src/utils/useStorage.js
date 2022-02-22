import { useCallback, useState, useEffect } from "preact/hooks"

export function useLocalStorage(key, defaultValue) {
  return useStorage(
    key,
    defaultValue,
    typeof window !== "undefined" ? window.localStorage : null
  )
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(
    key,
    defaultValue,
    typeof window !== "undefined" ? window.sessionStorage : null
  )
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject?.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}
