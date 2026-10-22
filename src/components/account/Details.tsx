import Card from '@/components/admin/ui/Card'
import PageHeader from '@/components/admin/ui/PageHeader'
import type { Details } from '@/lib/account/sections'

/** Read-only key/value groups; name and email come from the signed-in account. */
export default function DetailsView({ d, name, email }: { d: Details; name: string; email: string }) {
  const groups = d.title === 'My Profile' ? [{ heading: 'Account', items: [['Name', name], ['Email', email]] }, ...d.groups] : d.groups
  return (
    <>
      <PageHeader title={d.title} subtitle={d.subtitle} />
      <div className="grid max-w-[720px] gap-5">
        {groups.map((g) => (
          <Card key={g.heading} className="p-6">
            <h2 className="mb-3 text-lg font-medium tracking-[-0.02em] text-navy-deep">{g.heading}</h2>
            <dl className="divide-y divide-line">
              {g.items.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="font-medium text-muted">{k}</dt><dd className="text-right font-semibold text-navy-deep">{v}</dd></div>))}
            </dl>
          </Card>
        ))}
      </div>
    </>
  )
}
