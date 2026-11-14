export type PField = { name: string; label: string; toggle?: boolean; multiline?: boolean; readOnly?: boolean }
export type PGroup = { heading: string; fields: PField[] }

/** Single source for the editable account forms and the server-side whitelist of columns. */
export const profileGroups: Record<string, { title: string; subtitle: string; groups: PGroup[] }> = {
  profile: {
    title: 'My Profile',
    subtitle: 'Your details and the billing address used on invoices.',
    groups: [
      { heading: 'Personal', fields: [{ name: 'name', label: 'Name' }, { name: 'email', label: 'Email', readOnly: true }, { name: 'phone', label: 'Mobile number (for order confirmations)' }, { name: 'company', label: 'Company name' }] },
      { heading: 'Billing details', fields: [{ name: 'address', label: 'Address', multiline: true }, { name: 'country', label: 'Country' }, { name: 'state', label: 'State' }, { name: 'postal', label: 'Postal code' }, { name: 'gstin', label: 'GSTIN (where applicable)' }] },
    ],
  },
  settings: { title: 'Account Settings', subtitle: 'Preferences and privacy.', groups: [{ heading: 'Preferences', fields: [{ name: 'notify_email', label: 'Email me about orders, payments and support', toggle: true }, { name: 'marketing', label: 'Marketing emails and offers', toggle: true }] }] },
}

export const columnsFor = (slug: string) => (profileGroups[slug]?.groups.flatMap((g) => g.fields).filter((f) => !f.readOnly && f.name !== 'name') ?? [])
