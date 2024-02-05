import { JSX } from 'preact'

const linkStyles =
  'block p-2 text-gray-900 rounded hover:bg-gray-100 bg-transparent hover:bg-transparent border-0 hover:text-blue-700'

interface Props {
  isLoggedIn: boolean
}

const LoggedIn = () => {
  return (
    <>
      <li>
        <a
          href='/members/albums'
          className={linkStyles}
        >
          Valokuvat
        </a>
      </li>
      <li>
        <a
          href='/logout'
          className={linkStyles}
        >
          Logout
        </a>
      </li>
    </>
  )
}

const LoggedOut = () => {
  return (
    <li>
      <a
        href='/members'
        className={linkStyles}
      >
        Jäsenet
      </a>
    </li>
  )
}

export function Navigation({ isLoggedIn }: Props) {
  const Content = isLoggedIn ? LoggedIn : LoggedOut

  return (
    <nav className='bg-white/95 border-gray-200 sticky top-0  border-b z-[100]'>
      <div className='flex flex-wrap items-center justify-between mx-auto p-4'>
        <a
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='/images/vaakuna_small.png'
            className='h-8'
            alt='Tuomaala Coat of Arms'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            Tuomaala.fi
          </span>
        </a>
        <div>
          <ul className='font-medium flex p-0 border-gray-100 rounded-lg flex-row space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white '>
            <li>
              <a
                href='/'
                className={linkStyles}
                aria-current='page'
              >
                Etusivu
              </a>
            </li>
            <Content />
          </ul>
        </div>
      </div>
    </nav>
  )
}
