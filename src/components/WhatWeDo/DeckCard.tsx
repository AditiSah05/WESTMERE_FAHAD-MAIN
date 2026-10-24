import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import type { Service } from './data'

type Props = { card: Service; offset: number }

/** One card of the looping deck; only the centre card shows its text panel. */
export default function DeckCard({ card, offset }: Props) {
  const center = offset === 0
  const far = Math.abs(offset) > 1
  const Icon = card.icon

  return (
    <motion.div
      className={cn(
        'absolute flex flex-col overflow-hidden rounded-3xl border bg-white will-change-[transform,opacity]',
        center
          ? 'h-[410px] w-[290px] border-[1.5px] border-blue/35 shadow-[0_26px_55px_rgba(0,0,0,0.12),0_4px_18px_rgba(0,0,0,0.04)] min-[769px]:h-[490px] min-[769px]:w-[370px]'
          : 'h-[300px] w-[210px] border-line/80 shadow-[0_18px_40px_rgba(0,0,0,0.06),0_2px_10px_rgba(0,0,0,0.02)] min-[769px]:h-[360px] min-[769px]:w-[270px]',
      )}
      animate={{
        x: offset * 290,
        scale: center ? 1.08 : far ? 0.68 : 0.85,
        opacity: Math.abs(offset) >= 2 ? 0 : center ? 1 : 0.78,
        zIndex: center ? 30 : 20 - Math.abs(offset) * 5,
      }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden transition-[height] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          center ? 'h-[260px] min-[769px]:h-[330px]' : 'h-full',
        )}
      >
        <Image src={card.image} alt={card.title} fill sizes="370px" className="block object-cover" />
        <div
          className={cn(
            'absolute left-4 top-4 z-[5] flex size-11 items-center justify-center rounded-xl border bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)]',
            center ? 'border-gold/30 text-gold' : 'border-line/80 text-blue',
          )}
        >
          <Icon size={22} strokeWidth={2} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {center && (
          <motion.div
            className="flex flex-1 flex-col justify-between bg-white px-[22px] py-5 text-center"
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <h3 className="mb-1.5 font-body text-lg font-bold text-navy-deep">{card.title}</h3>
            <p className="mb-3.5 text-[13px] leading-[1.45] text-slate">{card.description}</p>
            <span className="inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-[#f5f7fa] px-3.5 py-[5px] text-[11px] font-bold tracking-[1px] text-navy">
              <span className="size-1.5 rounded-full bg-blue" />
              {card.tag}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
