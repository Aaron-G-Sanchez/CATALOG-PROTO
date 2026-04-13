import { publicProcedure, protectedProcedure, router } from './trpc'
import { z } from 'zod'

// TODO: DEPRECATE
import type { User } from '@catalog/types'
import { UserModel } from './models'

import { prisma } from './lib/prisma'

export const appRouter = router({
  userList: protectedProcedure.query(async () => {
    // TODO: DEPRECATE.
    // const userList = await UserModel.findAll()
    // return userList

    const userList = await prisma.user.findMany()
    return userList
  }),
  userById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input
      // TODO: DEPRECATE.
      // const user = await UserModel.findOne({
      //   where: {
      //     user_id: id,
      //   },
      // })
      // if (!user) return null
      // return user

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

      // TODO: DEPRECATE.
      // const newUser = await UserModel.create({
      //   user_id: input.user.user_id,
      //   name: input.user.name,
      // })

      // const user = newUser.toJSON() as User

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
