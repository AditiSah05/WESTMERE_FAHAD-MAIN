'use client'

import { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { submitRating } from '@/app/rating-actions'
import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'
import { csatEmojis } from './data'

const KEY = 'wm-csat'

/** A real satisfaction question: pick a face, send it, and the rating is saved for admin to read. */
export default function CsatCard({ title, description, labels }: { title: string; description: string; labels: string[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const [done, setDone] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) setDone('Thanks for rating us!')
    } catch {
      // private mode: the server cookie still prevents repeat votes
    }
  }, [])

  const send = () => {
    if (index === null) return
    setError(null)
    start(async () => {
      const r = await submitRating(index + 1)
      if (r.error) return setError(r.error)
      setDone(r.ok ?? 'Thanks for rating us!')
      try { localStorage.setItem(KEY, '1') } catch { /* ignore */ }
    })
  }

  return (
    <BentoCard delay={0.1} className="flex flex-col justify-between px-5 py-6 text-center min-[961px]:col-span-3">
      <div>
        <h3 className={cn(bentoTitle, 'mb-2')}>{title}</h3>
        <p className={bentoText}>{description}</p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        {done ? (
          <p role="status" className="py-8 text-sm font-semibold text-blue">{done}</p>
        ) : (
          <>
            <span className="min-h-[20px] text-[13px] font-semibold uppercase tracking-[0.15em] text-blue">{index === null ? 'Tap a face to rate' : labels[index] ?? ''}</span>
            <div className="flex items-center justify-center gap-1.5" role="radiogroup" aria-label="Rate your experience">
              {csatEmojis.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="radio"
                  aria-checked={i === index}
                  onClick={() => setIndex(i)}
                  aria-label={`${labels[i] ?? `Rating ${i + 1}`}, ${i + 1} out of 5`}
                  className={cn(
                    'size-[34px] rounded-full p-1 transition-all duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                    i === index
                      ? 'scale-[1.15] border-2 border-dashed border-blue bg-blue/10 opacity-100 shadow-[0_4px_14px_rgba(37,99,235,0.2)]'
                      : 'border border-dashed border-[rgba(200,200,200,0.4)] hover:scale-110 hover:opacity-85 ' + (index === null ? 'opacity-70' : 'opacity-40'),
                  )}
                >
                  <Image src={src} alt="" width={26} height={26} unoptimized className="size-full object-contain" />
                </button>
              ))}
            </div>
            <button type="button" onClick={send} disabled={index === null || pending} className="mt-1 rounded-lg bg-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-deep disabled:opacity-40">{pending ? 'Sending…' : 'Send rating'}</button>
            {error && <p role="alert" className="text-xs font-medium text-[#b91c1c]">{error}</p>}
          </>
        )}
      </div>
    </BentoCard>
  )
}
