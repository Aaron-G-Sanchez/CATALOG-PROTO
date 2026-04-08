import { initTRPC, TRPCError } from "@trpc/server";

type Context = { userId: string | null}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(
  async function isAuthed(opts){
    const {ctx} = opts

    if(!ctx.userId){
      throw new TRPCError({ code: 'UNAUTHORIZED'})
    }

    return opts.next({
      ctx: {
        user: ctx.userId
      }
    })
  }
)