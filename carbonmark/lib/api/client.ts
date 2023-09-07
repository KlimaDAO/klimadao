import type schema from '.generated/carbonmark-api.schema'
import { createClient, type NormalizeOAS } from 'fets'

export const client = createClient<NormalizeOAS<typeof schema>>({})
 