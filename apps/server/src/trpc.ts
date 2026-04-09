import { initTRPC } from '@trpc/server'

import type { Context } from './context'
import { isAuthed } from './middleware/auth'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
