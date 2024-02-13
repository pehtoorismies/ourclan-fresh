import { type PageProps } from '$fresh/server.ts'

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Tuomaala.fi</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest'></link>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap'
          rel='stylesheet'
        />
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <div className='container mx-auto max-w-screen-lg'>
          <Component />
        </div>
      </body>
    </html>
  )
}
