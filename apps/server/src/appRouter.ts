import { publicProcedure, protectedProcedure, router } from './trpc'
import { z } from 'zod'

import type { User } from '@catalog/types'
import { UserModel } from './models'

export const appRouter = router({
  userList: protectedProcedure.query(async () => {
    const userList = await UserModel.findAll()

    return userList
  }),
  userById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input

      const user = await UserModel.findOne({
        where: {
          user_id: id,
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
      const newUser = await UserModel.create({
        user_id: input.user.user_id,
        name: input.user.name,
      })

      const user = newUser.toJSON() as User

      return user
    }),
})

export type AppRouter = typeof appRouter
