'use client'

import { createContext, useContext, type ReactNode } from 'react'

const Ctx = createContext<Record<string, string>>({})

/** Makes the admin-managed picture URLs available to any client component under the site layout. */
export const ImagesProvider = ({ images, children }: { images: Record<string, string>; children: ReactNode }) => <Ctx.Provider value={images}>{children}</Ctx.Provider>

/** The uploaded picture for a slot, or the shipped one when nothing was uploaded. */
export const useImage = (slot: string, fallback: string) => useContext(Ctx)[slot] ?? fallback
