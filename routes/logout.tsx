import { defineRoute, Handlers, PageProps } from '$fresh/server.ts'
import { deleteCookie } from '$std/http/cookie.ts'
import { WithSession } from '$fresh-session'
import { Navigation } from '/components/Navigation.tsx'

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const headers = new Headers(req.headers)
    deleteCookie(headers, 'auth', { path: '/', domain: url.hostname })

    return ctx.render({}, { headers })
  },
}

export default defineRoute<WithSession>((req, ctx) => {
  const { session } = ctx.state

  session.clear()

  return (
    <div>
      <Navigation isLoggedIn={false} />
      <main>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl text-center p-4'>
            Olet kirjautunut ulos
          </h1>
          <a href='/'>
            <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>
              Siiry etusivulle
            </button>
          </a>
        </div>
      </main>
    </div>
  )
})
