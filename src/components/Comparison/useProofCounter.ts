import { useEffect, useState } from 'react'
import { avatarPool } from './data'

/** Counts 0 -> 5 slowly (rotating avatars), then 5 -> 0 quickly, and repeats. */
export function useProofCounter() {
  const [digit, setDigit] = useState(0)
  const [up, setUp] = useState(true)
  const [avatar, setAvatar] = useState(0)

  useEffect(() => {
    const next = () => setAvatar((a) => (a + 1) % avatarPool.length)
    const timer = setTimeout(() => {
      if (up) {
        if (digit < 5) {
          setDigit(digit + 1)
          next()
        } else {
          setUp(false)
          setDigit(4)
        }
      } else if (digit > 0) {
        setDigit(digit - 1)
      } else {
        setUp(true)
        setDigit(1)
        next()
      }
    }, up ? 2400 : 180)
    return () => clearTimeout(timer)
  }, [digit, up])

  return { digit, up, avatar }
}
