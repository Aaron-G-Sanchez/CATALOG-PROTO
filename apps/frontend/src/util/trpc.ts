import { createTRPCClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from 'server'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: BASE_URL })],
})
