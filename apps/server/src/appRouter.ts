import { publicProcedure, protectedProcedure, router } from './trpc'
import { z } from 'zod'

import type { User } from '@catalog/types'

export const appRouter = router({
  userList: protectedProcedure.query(async ({ ctx }) => {
    console.log({ context: ctx })
    const users: User[] = [
      { id: '1', name: 'user1' },
      { id: '2', name: 'user2' },
    ]

    return users
  }),
  userById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { input } = opts
      const { id } = input

      console.log(input)
      const user: User = { id, name: 'test-user' }

      return user
    }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts
      const user: User = { id: '1', ...input }

      return user
    }),
})

export type AppRouter = typeof appRouter
