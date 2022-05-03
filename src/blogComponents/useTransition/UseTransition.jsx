import { useState, useRef } from "preact/hooks"

const LIST_SIZE = 5

export default function UseTransition({
  withoutHook = false,
  withoutLoading = false,
}) {
  const [name, setName] = useState("a")
  const inputRef = useRef()
  const timeoutRef = useRef()
  const [isPending, setIsPending] = useState(false)
  const [list, setList] = useState(() => {
    const l = []
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push("a")
    }
    return l
  })

  function handleChange(e) {
    const value = e.target.value
    if (withoutHook) {
      inputRef.current.value = name
    } else {
      setName(value)
      setIsPending(true)
    }
    if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (withoutHook) {
        setName(value)
      } else {
        setIsPending(false)
      }
      const l = []
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(value)
      }
      setList(l)
    }, 1000)
  }

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        value={name}
        onInput={handleChange}
        onChange={handleChange}
      />
      {withoutLoading === false && isPending ? (
        <div>Loading...</div>
      ) : (
        list.map((item, index) => (
          <div style={{ color: "var(--theme-text-lighter)" }} key={index}>
            Item: {item}
          </div>
        ))
      )}
    </>
  )
}
