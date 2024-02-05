import { Head } from '$fresh/runtime.ts'
import { Navigation } from '/components/Navigation.tsx'
import { defineRoute } from '$fresh/server.ts'
import { WithSession } from '$fresh-session'

export default defineRoute<WithSession>((_req, ctx) => {
  const { session } = ctx.state

  return (
    <>
      <Head>
        <title>404 - Sivua ei löytynyt</title>
      </Head>
      <div>
        <Navigation isLoggedIn={!!session.get('isLoggedIn')} />

        <div class='px-4 py-8 mx-auto bg-yellow-100'>
          <div class='max-w-screen-md mx-auto flex flex-col items-center justify-center'>
            <img
              class='my-6'
              src='/images/vaakuna_small.png'
              width='128'
              height='128'
              alt='Vaakuna'
            />
            <h1 class='text-4xl font-bold'>404 - Sivua ei löytynyt</h1>
            <p class='my-4'>
              Sivua ei löydy
            </p>
            <a href='/' class='underline'>Etusivulle</a>
          </div>
        </div>
      </div>
    </>
  )
})
