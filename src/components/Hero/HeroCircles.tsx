import { heroIcons } from './heroIcons'

type Ring = { r: number; fill?: string; border: string; dashed?: boolean }

/** Radii in vw. Each side is a set of rings around a point just outside the screen edge; the inner one is tinted. */
const rings: Record<'left' | 'right', Ring[]> = {
  left: [
    { r: 26.5, border: '#eceff8' },
    { r: 22.6, border: '#e2e7f5' },
    { r: 20.8, border: '#b4bfee', dashed: true },
    { r: 18.9, border: '#e0e5f5' },
    { r: 14.4, border: '#dde3f5', fill: 'radial-gradient(circle, #e9ecfa 0%, #f2f4fc 70%)' },
  ],
  right: [
    { r: 26.5, border: '#f6eee3' },
    { r: 22.6, border: '#f3e8da' },
    { r: 20.8, border: '#efc9a0', dashed: true },
    { r: 18.9, border: '#f3e7d8' },
    { r: 14.4, border: '#f0e2cf', fill: 'radial-gradient(circle, #fdf1e0 0%, #fbf5ec 70%)' },
  ],
}
const CENTER = { left: -4, right: 104 }

// One full turn takes 120s (180s for the dashed rings). Class names are written out so Tailwind can see them.
const still = 'motion-reduce:animate-none'

/** Decorative rings on both sides with the tech tiles riding around them. Hidden on small screens. */
export default function HeroCircles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden min-[810px]:block">
      {(['left', 'right'] as const).flatMap((side) =>
        rings[side].map((ring) => (
          <div
            key={`${side}${ring.r}`}
            // The dashed ring slowly spins, so its dashes visibly travel; left clockwise, right the other way.
            className={`absolute top-1/2 aspect-square -translate-y-1/2 rounded-full ${ring.dashed ? `animate-[heroOrbit_180s_linear_infinite] ${side === 'right' ? '[animation-direction:reverse]' : ''} ${still}` : ''}`}
            style={{ width: `${ring.r * 2}vw`, left: `${CENTER[side] - ring.r}vw`, border: `${ring.dashed ? 1.5 : 1}px ${ring.dashed ? 'dashed' : 'solid'} ${ring.border}`, background: ring.fill }}
          />
        )),
      )}
      {(['left', 'right'] as const).map((side) => {
        const dir = side === 'right' ? '[animation-direction:reverse]' : ''
        return (
          <div key={side} className={`absolute top-1/2 size-0 animate-[heroOrbit_120s_linear_infinite] ${dir} ${still}`} style={{ left: `${CENTER[side]}vw` }}>
            {heroIcons.filter((t) => t.side === side).map((t) => (
              <div key={t.name} className="absolute left-0 top-0 size-0" style={{ transform: `rotate(${t.a}deg)` }}>
                <div className={`absolute top-0 size-0 ${t.inner ? 'max-[1099px]:hidden' : ''}`} style={{ left: `${t.r}vw` }}>
                  {/* Two counter-rotations keep each tile upright while its ring turns. */}
                  <div style={{ transform: `rotate(${-t.a}deg)` }}>
                    <div className={`-ml-[24.5px] -mt-[24.5px] flex size-[49px] animate-[heroCounter_120s_linear_infinite] items-center justify-center rounded-xl border border-white/70 bg-white shadow-soft ${dir} ${still}`}>
                      {t.node}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
