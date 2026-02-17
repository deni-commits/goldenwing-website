'use server'

import { handleServerFunctions as payloadHandleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap'

export const handleServerFunctions: ServerFunctionClient = async (args) => {
  'use server'
  return payloadHandleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}
