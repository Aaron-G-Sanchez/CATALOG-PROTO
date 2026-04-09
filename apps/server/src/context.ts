import 'dotenv/config'
import { verifyToken } from '@clerk/backend'
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone'

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY

if (!CLERK_SECRET_KEY) throw new Error('No Clerk secret key.')

export const createContext = async (
  opts: CreateHTTPContextOptions
): Promise<{ userId: string | null }> => {
  const auth = opts.req.headers.authorization
  const token = auth?.startsWith('Bearer ') ? auth.split(' ')[1] : null

  if (!token) return { userId: null }

  try {
    const session = await verifyToken(token, {
      secretKey: CLERK_SECRET_KEY,
    })

    if (session) {
      return { userId: session.sub }
    } else return { userId: null }
  } catch {
    return { userId: null }
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
