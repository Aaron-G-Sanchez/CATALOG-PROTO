import { publicProcedure, protectedProcedure, router } from './trpc'
import { z } from 'zod'

import { prisma } from './lib/prisma'

export const appRouter = router({
  userList: protectedProcedure.query(async () => {
    const userList = await prisma.user.findMany()
    return userList
  }),
  userById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      })

      if (!user) return null
      return user
    }),
  userCreate: publicProcedure
    .input(
      z.object({
        user: z.object({
          user_id: z.number(),
          name: z.string(),
        }),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts

      const newUser = await prisma.user.create({
        data: {
          id: input.user.user_id,
          name: input.user.name,
        },
      })

      return newUser
    }),
})

export type AppRouter = typeof appRouter
