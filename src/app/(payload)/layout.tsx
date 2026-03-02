/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { ServerFunctionClient } from 'payload'
import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import '@payloadcms/next/css'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  const { default: getPayload } = await import('payload')
  const payload = await getPayload({ config })
  return args.payload ? args : { ...args, payload }
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={{}} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
