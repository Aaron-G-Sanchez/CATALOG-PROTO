import { createTRPCClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../server/appRouter";


const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001'
    })
  ]
})

const users = await trpc.userList.query()

console.log(users);