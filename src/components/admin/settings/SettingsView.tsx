'use client'

import { useEffect, useState } from 'react'
import { loadRecords, writeRecords } from '@/app/admin/records'
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
  const storage = `settings:${keyName}`
  const [value, setValue] = useState<Row>(section.defaults)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    loadRecords(storage).then((r) => r?.[0] && setValue(r[0])).catch(() => (window.location.href = '/admin/login'))
  }, [storage])

  const save = async () => {
    try {
      await writeRecords(storage, [value])
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      window.location.href = '/admin/login'
    }
  }

  return (
    <Card className="max-w-[640px] p-6">
      <RecordForm fields={section.fields} value={value} onChange={setValue} />
      <div className="mt-6 flex items-center gap-3">
        <button type="button" className={btn.gold} onClick={() => void save()}>Save changes</button>
        {saved && <span className="text-sm font-medium text-[#047857]">Saved</span>}
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
