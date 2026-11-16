export const field = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white read-only:text-muted'

export const Msg = ({ s }: { s?: { error?: string; ok?: string } }) => (
  <>
    {s?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{s.error}</p>}
    {s?.ok && <p role="status" className="rounded-lg bg-[#10b981]/10 px-3 py-2.5 text-sm font-medium text-[#047857]">{s.ok}</p>}
  </>
)
