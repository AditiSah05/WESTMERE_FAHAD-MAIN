'use client'

import { useState } from 'react'
import Card from './ui/Card'
import PageHeader from './ui/PageHeader'
import Tabs from './ui/Tabs'
import TabPanel from './TabPanel'
import type { TabConfig } from '@/lib/admin/types'

type Props = { module: string; title: string; subtitle?: string; tabs: TabConfig[]; stats?: { label: string; value: string }[] }

/** Generic admin screen: header + tab pills; each tab renders a searchable table with detail/edit drawer. */
export default function ModuleView({ module, title, subtitle, tabs, stats }: Props) {
  const [active, setActive] = useState(tabs[0].key)
  const tab = tabs.find((t) => t.key === active) ?? tabs[0]

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {stats && (
        <div className="mb-5 grid grid-cols-1 gap-4 min-[601px]:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.label} className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">{s.label}</p>
              <p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-navy-deep">{s.value}</p>
            </Card>
          ))}
        </div>
      )}
      <Tabs tabs={tabs} active={tab.key} onChange={setActive} />
      <TabPanel key={tab.key} module={module} tab={tab} />
    </>
  )
}
