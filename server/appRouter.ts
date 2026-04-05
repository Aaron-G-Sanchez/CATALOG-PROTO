import {publicProcedure, router} from './trpc'
import {z} from 'zod'

import  type { User }  from '../types/User'

export const appRouter = router({
  userList: publicProcedure
    .query( async () => {
    const users: User[] = [
      {id: '1', name: 'user1'},
      {id: '2', name: 'user2'}
    ]

    return users
  }),
  userById: publicProcedure
    .input(z.string())
    .query( async (opts) => {
      const {input} = opts
      const user: User = {id: input, name: 'test-user'}

      return user
    }),
    userCreate: publicProcedure
      .input(z.object({name: z.string()}))
      .mutation( async (opts) => {
        const {input} = opts
        const user: User = {id: "1", ...input}
        
        return user
      })

})

export type AppRouter = typeof appRouter