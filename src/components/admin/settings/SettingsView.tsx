'use client'

import { useEffect, useState } from 'react'
import { settingsSections } from '@/lib/admin/data/settings'
import type { Row } from '@/lib/admin/types'
import Card from '../ui/Card'
import PageHeader, { btn } from '../ui/PageHeader'
import RecordForm from '../ui/RecordForm'
import Tabs from '../ui/Tabs'
import PasswordForm from './PasswordForm'

const tabs = [...settingsSections.map((s) => ({ key: s.key, label: s.label })), { key: 'password', label: 'Security & password' }]

function Section({ keyName }: { keyName: string }) {
  const section = settingsSections.find((s) => s.key === keyName)!
  const storage = `westmere-admin:settings:${keyName}`
  const [value, setValue] = useState<Row>(section.defaults)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storage)
      if (raw) setValue(JSON.parse(raw) as Row)
    } catch { /* ignore */ }
  }, [storage])

  const save = () => {
    try { localStorage.setItem(storage, JSON.stringify(value)) } catch { /* ignore */ }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card className="max-w-[640px] p-6">
      <RecordForm fields={section.fields} value={value} onChange={setValue} />
      <div className="mt-6 flex items-center gap-3">
        <button type="button" className={btn.gold} onClick={save}>Save changes</button>
        {saved && <span className="text-sm font-medium text-[#047857]">Saved in this browser</span>}
      </div>
    </Card>
  )
}

export default function SettingsView() {
  const [active, setActive] = useState(tabs[0].key)
  return (
    <>
      <PageHeader title="Settings" subtitle="Company, billing, security and system configuration." />
      <Tabs tabs={tabs} active={active} onChange={setActive} />
      {active === 'password' ? <PasswordForm /> : <Section key={active} keyName={active} />}
    </>
  )
}
