import { useMemo } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router'

import { createClient } from '../util/trpc'
import type { TRPCClient } from '@trpc/client'
import type { AppRouter } from 'server'

export type TRPCContext = { client: TRPCClient<AppRouter> }

export const ProtectedRoute = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  const trpcClient = useMemo(() => createClient(getToken), [getToken])

  if (!isLoaded) return 'Loading...'
  if (!isSignedIn) return <Navigate to="/" replace />

  return <Outlet context={{ client: trpcClient } satisfies TRPCContext} />
}
