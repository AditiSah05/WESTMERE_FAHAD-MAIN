import { Check, Minus, Eye } from 'lucide-react'
import { MODULES, ROLES, accessOf, roleLabel, roleSummary } from '@/lib/admin/permissions'
import Card from '../ui/Card'

const cell = (a: 'read' | 'write' | null) =>
  a === 'write' ? <span title="Read and change" className="inline-flex text-[#047857]"><Check size={16} /></span>
  : a === 'read' ? <span title="Read only" className="inline-flex text-gold"><Eye size={16} /></span>
  : <span className="inline-flex text-[#cbd5e1]"><Minus size={16} /></span>

export default function RolesTab() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3 min-[769px]:grid-cols-2 min-[1181px]:grid-cols-5">
        {ROLES.map((r) => (
          <Card key={r} className="p-4"><p className="font-medium text-navy-deep">{roleLabel[r]}</p><p className="mt-1 text-[13px] font-medium text-muted">{roleSummary[r]}</p></Card>
        ))}
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead><tr className="border-b border-line bg-paper/70 text-[11px] uppercase tracking-[0.12em] text-slate">
            <th className="px-4 py-3 font-semibold">Area</th>{ROLES.map((r) => <th key={r} className="px-4 py-3 text-center font-semibold">{roleLabel[r]}</th>)}
          </tr></thead>
          <tbody>
            {MODULES.map((m) => (
              <tr key={m} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-2.5 font-medium capitalize text-navy-deep">{m}</td>
                {ROLES.map((r) => <td key={r} className="px-4 py-2.5 text-center">{cell(accessOf(r, m))}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-line px-4 py-3 text-xs font-medium text-muted">Tick = read and change · Eye = read only · Dash = no access. Enforced on the server for every page and action.</p>
      </Card>
    </div>
  )
}
