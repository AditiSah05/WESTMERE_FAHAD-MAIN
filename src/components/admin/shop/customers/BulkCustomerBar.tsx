'use client'

import {
  Ban,
  CheckSquare,
  Download,
  FileEdit,
  Mail,
  Square,
  Tag,
  Trash2,
  UserCheck,
} from 'lucide-react'

type Props = {
  selectedCount: number
  totalCount: number
  onClear: () => void
  onSendEmail: () => void
  onAssignTags: () => void
  onChangeStatus: () => void
  onAddNote: () => void
  onExport: () => void
  onBlock: () => void
  onDelete: () => void
}

export default function BulkCustomerBar({
  selectedCount,
  onClear,
  onSendEmail,
  onAssignTags,
  onChangeStatus,
  onAddNote,
  onExport,
  onBlock,
  onDelete,
}: Props) {
  if (selectedCount === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/30 bg-[#fffdf7] px-4 py-2.5 shadow-sm transition-all">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 text-xs font-bold text-navy-deep hover:text-gold"
        >
          <CheckSquare size={16} className="text-gold" />
          <span>{selectedCount} selected</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onSendEmail}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
        >
          <Mail size={13} className="text-muted" />
          <span>Send Email</span>
        </button>

        <button
          type="button"
          onClick={onAssignTags}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
        >
          <Tag size={13} className="text-muted" />
          <span>Assign Tags ▾</span>
        </button>

        <button
          type="button"
          onClick={onChangeStatus}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
        >
          <UserCheck size={13} className="text-muted" />
          <span>Change Status ▾</span>
        </button>

        <button
          type="button"
          onClick={onAddNote}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
        >
          <FileEdit size={13} className="text-muted" />
          <span>Add Internal Note</span>
        </button>

        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
        >
          <Download size={13} className="text-muted" />
          <span>Export Selected</span>
        </button>

        <button
          type="button"
          onClick={onBlock}
          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50/50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100/60"
        >
          <Ban size={13} />
          <span>Block Selected</span>
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50/50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100/60"
        >
          <Trash2 size={13} />
          <span>Delete Selected</span>
        </button>
      </div>
    </div>
  )
}
