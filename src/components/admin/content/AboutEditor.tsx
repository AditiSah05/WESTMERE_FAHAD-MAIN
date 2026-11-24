'use client'

import { useActionState } from 'react'
import { saveAbout } from '@/app/admin/content-actions'
import Card from '@/components/admin/ui/Card'
import { btn } from '@/components/admin/ui/PageHeader'
import type { About } from '@/lib/about-content'
import ListEditor from './ListEditor'
import { Msg, field } from './form'

const lbl = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

/** Everything on /about that is text: top heading and intro, origin story, numbers, values, process and journey. */
export default function AboutEditor({ initial: a, canWrite }: { initial: About; canWrite: boolean }) {
  const [state, action, pending] = useActionState(saveAbout, undefined)
  const ro = !canWrite
  return (
    <Card className="mb-6 max-w-[900px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">About Us page</h2>
      <p className="mb-5 text-sm font-medium text-muted">Edit the text on /about. Icons and colours follow the order of the items.</p>
      <form action={action} className="grid gap-5">
        <label className="flex flex-col gap-1.5"><span className={lbl}>Top heading</span><input name="heroHeading" defaultValue={a.hero.heading} maxLength={120} readOnly={ro} className={field} /></label>
        <label className="flex flex-col gap-1.5"><span className={lbl}>Intro under the heading</span><textarea name="heroIntro" defaultValue={a.hero.intro} rows={3} maxLength={400} readOnly={ro} className={field} /></label>
        <label className="flex flex-col gap-1.5"><span className={lbl}>Story title</span><input name="storyTitle" defaultValue={a.story.title} maxLength={80} readOnly={ro} className={field} /></label>
        <label className="flex flex-col gap-1.5"><span className={lbl}>Story (blank line between paragraphs)</span><textarea name="storyBody" defaultValue={a.story.paragraphs.join('\n\n')} rows={7} maxLength={2000} readOnly={ro} className={`${field} leading-relaxed`} /></label>
        <ListEditor legend="Numbers" hint="The big figures next to the story, for example 100% and Client CSAT Rating." prefix="stat" max={6} canWrite={canWrite} initial={a.stats}
          fields={[{ key: 'value', label: 'Number', max: 12 }, { key: 'label', label: 'Label', max: 40 }]} />
        <ListEditor legend="What we stand for" hint="Cards with an icon, a title and a sentence." prefix="value" max={6} canWrite={canWrite} initial={a.values}
          fields={[{ key: 'title', label: 'Title', max: 40 }, { key: 'desc', label: 'Text', max: 220, multiline: true }]} />
        <ListEditor legend="Our process" hint="Steps are numbered automatically." prefix="step" max={8} canWrite={canWrite} initial={a.process}
          fields={[{ key: 'title', label: 'Step', max: 30 }, { key: 'desc', label: 'Text', max: 100 }]} />
        <ListEditor legend="Our journey" hint="The timeline, oldest first." prefix="ms" max={8} canWrite={canWrite} initial={a.milestones}
          fields={[{ key: 'year', label: 'Year', max: 10 }, { key: 'title', label: 'Title', max: 50 }, { key: 'desc', label: 'Text', max: 240, multiline: true }]} />
        <Msg s={state} />
        {canWrite && <div><button type="submit" disabled={pending} className={`${btn.gold} disabled:opacity-70`}>{pending ? 'Saving…' : 'Save About page'}</button></div>}
      </form>
    </Card>
  )
}
