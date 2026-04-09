import { TRPCError } from '@trpc/server'

export const isAuthed = (opts: {
  ctx: { userId: string | null }
  next: Function
}) => {
  const { ctx } = opts

  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      user: ctx.userId,
    },
  })
}
