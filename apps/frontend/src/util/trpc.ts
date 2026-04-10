import { QueryClient } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from 'server'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const queryClient = new QueryClient()

export const createClient = (getToken: () => Promise<string | null>) => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: BASE_URL,
        async headers() {
          const token = await getToken()
          return {
            Authorization: token ? `Bearer ${token}` : '',
          }
        },
      }),
    ],
  })
}
