import { MiddlewareHandlerContext } from '$fresh/server.ts'
export default async function loggingMiddleware(
  req: Request,
  ctx: MiddlewareHandlerContext
): Promise<Response> {
  const res = await ctx.next()
  console.log(`${req.method} ${req.url} ${res.status}`)
  return res
}
