import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { MWState } from '../utils/types.ts'
export default async function loggingMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext<MWState>
): Promise<Response> {
  const res = await ctx.next()
  if (req.url.includes('_frsh')) {
    return res
  }
  const user = ctx.state.user?.email ?? 'anon'
  console.log(`${user}: ${req.method} ${req.url} ${res.status}`)
  return res
}
