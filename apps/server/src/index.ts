import cors from 'cors'
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import 'dotenv/config'

import { appRouter } from "./appRouter";
export type {AppRouter} from './appRouter'
import { createContext } from './context';

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext
})

server.listen(3001)