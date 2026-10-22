import type { ReactNode } from 'react'

const label = 'text-[13px] font-semibold text-[#2d2d2d] min-[810px]:text-lg'

const Brand = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-center gap-1 opacity-75 min-[810px]:gap-1.5">{children}</div>
)

/** "Trusted by" row: dashed rules around the label, six logos in a 3x2 grid. */
export default function BrandLogos() {
  return (
    <div className="flex w-full flex-col items-center gap-[clamp(28px,4.5vh,44px)]">
      <p className="flex w-full items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase leading-none tracking-[0.15em] text-slate before:flex-1 before:border-t before:border-dashed before:border-[#cbd5e1] after:flex-1 after:border-t after:border-dashed after:border-[#cbd5e1]">
        TRUSTED BY FORWARD-THINKING BRANDS
      </p>
      <div className="grid grid-cols-3 items-center justify-items-center gap-x-2 gap-y-[22px] min-[810px]:grid-cols-[repeat(3,170px)] min-[810px]:gap-x-0 min-[810px]:gap-y-[clamp(20px,3.5vh,32px)]">
        <Brand><span className="text-[15px] font-bold tracking-[-0.5px] text-[#635bff] min-[810px]:text-xl">stripe</span></Brand>
        <Brand>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="3" stroke="#2D2D2D" strokeWidth="1.5" /><text x="5" y="13.5" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#2D2D2D">N</text></svg>
          <span className={label}>Notion</span>
        </Brand>
        <Brand><span className="text-[15px] font-bold text-[#4353ff] min-[810px]:text-xl">webflow</span></Brand>
        <Brand>
          <svg width="14" height="18" viewBox="0 0 16 20" fill="none"><path d="M0 0h16v6.67H8L0 0z" fill="#0055FF" /><path d="M0 6.67h8l8 6.66H8v6.67L0 13.33V6.67z" fill="#0055FF" /></svg>
          <span className={label}>Framer</span>
        </Brand>
        <Brand>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3.8 11.4a1.9 1.9 0 1 1-1.9-1.9h1.9v1.9zM4.7 11.4a1.9 1.9 0 1 1 3.8 0v4.7a1.9 1.9 0 1 1-3.8 0v-4.7z" fill="#E01E5A" />
            <path d="M6.6 3.8a1.9 1.9 0 1 1 1.9-1.9v1.9H6.6zM6.6 4.7a1.9 1.9 0 1 1 0 3.8H1.9a1.9 1.9 0 1 1 0-3.8h4.7z" fill="#36C5F0" />
            <path d="M14.2 6.6a1.9 1.9 0 1 1 1.9 1.9h-1.9V6.6zM13.3 6.6a1.9 1.9 0 1 1-3.8 0V1.9a1.9 1.9 0 1 1 3.8 0v4.7z" fill="#2EB67D" />
            <path d="M11.4 14.2a1.9 1.9 0 1 1-1.9 1.9v-1.9h1.9zM11.4 13.3a1.9 1.9 0 1 1 0-3.8h4.7a1.9 1.9 0 1 1 0 3.8h-4.7z" fill="#ECB22E" />
          </svg>
          <span className={`${label} !font-bold`}>slack</span>
        </Brand>
        <Brand>
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#5E6AD2" strokeWidth="1.6" /><path d="M5 9l3 3 5-6" stroke="#5E6AD2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className={label}>Linear</span>
        </Brand>
      </div>
    </div>
  )
}
