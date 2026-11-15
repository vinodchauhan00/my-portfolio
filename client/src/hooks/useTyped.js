import { useEffect, useState } from 'react'

export default function useTyped(words, speed = 70, pause = 1400) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    let t
    if (!del && text === word) t = setTimeout(() => setDel(true), pause)
    else if (del && text === '') { setDel(false); setI((n) => n + 1) }
    else t = setTimeout(() => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), del ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [text, del, i, words, speed, pause])
  return text
}
