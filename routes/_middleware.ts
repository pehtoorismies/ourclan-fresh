import { FreshContext } from '$fresh/server.ts'

import { cookieSession, WithSession } from '$fresh-session'

const DAY = 60 * 60 * 24

function sessionHandler(
  req: Request,
  ctx: FreshContext<WithSession>,
) {
  const url = new URL(req.url)

  const session = cookieSession({
    maxAge: DAY * 180,
    httpOnly: true,
    sameSite: 'Lax',
    path: '/',
    secure: true,
    domain: url.hostname,
  })

  return session(req, ctx)
}

export const handler = [sessionHandler]
