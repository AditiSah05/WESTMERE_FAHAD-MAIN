'use client'

import { useActionState } from 'react'
import { saveHomeAbout } from '@/app/admin/content-actions'
import Card from '@/components/admin/ui/Card'
import { btn } from '@/components/admin/ui/PageHeader'
import type { HomeAbout } from '@/lib/home-about-content'
import ListEditor from './ListEditor'
import { Msg, field } from './form'

const lbl = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

function Text({ name, label, value, max, ro }: { name: string; label: string; value: string; max: number; ro: boolean }) {
  return <label className="flex flex-col gap-1.5"><span className={lbl}>{label}</span><input name={name} defaultValue={value} maxLength={max} readOnly={ro} className={field} /></label>
}

/** The "About us" block on the home page: photo slides, satisfaction card, gauges, industries and the call card. */
export default function HomeAboutEditor({ initial: h, canWrite }: { initial: HomeAbout; canWrite: boolean }) {
  const [state, action, pending] = useActionState(saveHomeAbout, undefined)
  const ro = !canWrite
  return (
    <Card className="mb-6 max-w-[900px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Home page: About us block</h2>
      <p className="mb-5 text-sm font-medium text-muted">The cards under &ldquo;About us&rdquo; on the home page. The slide photos are under Site pictures.</p>
      <form action={action} className="grid gap-5">
        <ListEditor legend="Photo slides" hint="Three slides, each with a title and a sentence." prefix="slide" max={3} fixed canWrite={canWrite} initial={h.slides}
          fields={[{ key: 'title', label: 'Title', max: 40 }, { key: 'description', label: 'Text', max: 100 }]} />
        <div className="grid gap-3 border-t border-line pt-5 min-[769px]:grid-cols-2">
          <Text name="csatTitle" label="Satisfaction card title" value={h.csat.title} max={30} ro={ro} />
          <Text name="csatDesc" label="Satisfaction card text" value={h.csat.description} max={80} ro={ro} />
        </div>
        <ListEditor legend="Satisfaction labels" hint="One word for each of the five faces, saddest first." prefix="csatlabel" max={5} fixed canWrite={canWrite} initial={h.csat.labels.map((name) => ({ name }))}
          fields={[{ key: 'name', label: 'Label', max: 14 }]} />
        <div className="grid gap-3 border-t border-line pt-5 min-[769px]:grid-cols-2">
          <Text name="gaugeTitle" label="Gauges title" value={h.gauges.title} max={60} ro={ro} />
          <Text name="gaugeSub" label="Gauges text" value={h.gauges.subtitle} max={100} ro={ro} />
        </div>
        <ListEditor legend="Gauges" hint="Three circles; the middle one is drawn larger. Value is a number from 0 to 100." prefix="gauge" max={3} fixed canWrite={canWrite} initial={h.gauges.items.map((g) => ({ label: g.label, value: String(g.value) }))}
          fields={[{ key: 'label', label: 'Label', max: 20 }, { key: 'value', label: 'Value (0-100)', max: 3 }]} />
        <div className="border-t border-line pt-5"><Text name="indTitle" label="Industries title" value={h.industries.title} max={50} ro={ro} /></div>
        <ListEditor legend="Industries" hint="The scrolling list, 3 to 12 entries." prefix="ind" max={12} canWrite={canWrite} initial={h.industries.items.map((name) => ({ name }))}
          fields={[{ key: 'name', label: 'Industry', max: 40 }]} />
        <div className="grid gap-3 border-t border-line pt-5 min-[769px]:grid-cols-3">
          <Text name="ctaTitle" label="Call card title" value={h.cta.title} max={50} ro={ro} />
          <Text name="ctaButton" label="Button text" value={h.cta.button} max={50} ro={ro} />
          <Text name="ctaNote" label="Small text under the button" value={h.cta.note} max={80} ro={ro} />
        </div>
        <Msg s={state} />
        {canWrite && <div><button type="submit" disabled={pending} className={`${btn.gold} disabled:opacity-70`}>{pending ? 'Saving…' : 'Save home About block'}</button></div>}
      </form>
    </Card>
  )
}
