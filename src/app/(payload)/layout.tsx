/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import type { ReactNode } from 'react'

import { importMap } from './admin/importMap'
import { handleServerFunctions } from './actions'
import '@payloadcms/next/css'
import './custom.scss'

type Args = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'GoldenWing Admin',
  description: 'Content Management System',
}

export default async function Layout({ children }: Args) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={handleServerFunctions}
    >
      {children}
    </RootLayout>
  )
}
