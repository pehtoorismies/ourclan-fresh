import type { Handlers, PageProps } from '$fresh/server.ts'

import { Navigation } from '/components/Navigation.tsx'
import { getEnvironmentVariable } from '/utils/get-environment-variable.ts'

import { WithSession } from '$fresh-session'

interface Data {
  errorMessage: string | undefined
}

const APP_PASSWORD = getEnvironmentVariable('PASSWORD')

export const handler: Handlers<Data, WithSession> = {
  GET(req, ctx) {
    const { session } = ctx.state

    if (ctx.state.session.get('isLoggedIn')) {
      const url = new URL(req.url)
      url.pathname = '/album'
      return Response.redirect(url)
    }
    return ctx.render({ errorMessage: undefined })
  },
  async POST(req, ctx) {
    const { session } = ctx.state

    const url = new URL(req.url)
    const form = await req.formData()

    const password = form.get('password')

    if (typeof password !== 'string') {
      return ctx.render({
        errorMessage: `Virhe salasasana lähettämisessä'`,
      })
    }

    if (password === APP_PASSWORD) {
      session.set('isLoggedIn', true)
      return new Response(null, {
        status: 303, // "See Other"
        headers: { Location: '/members/albums' },
      })
    } else {
      return ctx.render({
        errorMessage: `Väärä salasana`,
      })
    }
  },
}

export default function Login({ data }: PageProps<Data>) {
  const common = 'border rounded-md block w-full text-sm p-2.5'
  const classes = data.errorMessage
    ? 'bg-red-50 border-red-300 text-red-900'
    : 'bg-gray-50 border-grey-300 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500'

  return (
    <div>
      <Navigation isLoggedIn={false} />
      <div className='container p-3 mx-auto'>
        <div className='max-w-sm mx-auto my-4'>
          <h1 className='text-xl font-semibold leading-7 text-gray-900 mx-auto text-center'>
            Valokuva-albumit vain suvun jäsenille.
          </h1>
        </div>
        <div className=''>
          <form
            className='max-w-sm mx-auto border-2 border-yellow-400 p-4 rounded-md'
            method='post'
          >
            <div className='mb-5'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Anna salasana
              </label>
              <input
                type='password'
                name='password'
                placeholder='salasana'
                className={`${common} ${classes}`}
                required
              />
              <div className='text-red-600 text-sm my-1'>
                {data.errorMessage}
              </div>
            </div>
            <div className='flex'>
              <button
                type='submit'
                className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >
                Kirjaudu
              </button>
              <button
                type='reset'
                className='text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center'
              >
                Tyhjennä
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
